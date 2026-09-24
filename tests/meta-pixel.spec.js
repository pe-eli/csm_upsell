import { test, expect } from '@playwright/test';

const pixelId = '1120520213871385';
const checkout = 'https://pay.cakto.com.br/xzi9krb_1005370';

test('one script and one event each, including StrictMode and remounts; checkout only navigates', async ({ page }) => {
  const calls = [];
  let scriptRequests = 0;
  await page.exposeFunction('recordMetaCall', args => calls.push(args));
  await page.route('https://connect.facebook.net/**', async route => {
    scriptRequests++;
    await route.fulfill({ contentType: 'text/javascript', body: `
      window.fbq.callMethod = function() { window.recordMetaCall(Array.from(arguments)); };
      window.fbq.queue.splice(0).forEach(args => window.fbq.callMethod.apply(null, args));
    ` });
  });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect.poll(() => calls.filter(c => c[0] === 'track').length).toBe(2);
  expect(calls.filter(c => c[0] === 'init')).toEqual([['init', pixelId]]);
  expect(calls.filter(c => c[0] === 'track')).toEqual([
    ['track', 'PageView'],
    ['track', 'ViewContent', {
      content_name: 'Método Emprego Rápido', content_ids: ['metodo_emprego_rapido'],
      content_type: 'product', value: 47, currency: 'BRL',
    }],
  ]);
  await page.evaluate(async () => {
    const { exerciseReactLifecycle } = await import('/tests/pixel-harness.jsx');
    exerciseReactLifecycle();
    // Exercise the bootstrap twice as well, as an accidental repeated embedding.
    const base = [...document.scripts].find(s => s.textContent.includes('!function(f,b,e,v,n,t,s)'));
    (0, eval)(base.textContent);
  });
  expect(scriptRequests).toBe(1);
  expect(calls.filter(c => c[0] === 'track')).toHaveLength(2);
  for (const link of await page.locator('[data-checkout]').all()) {
    await expect(link).toHaveAttribute('href', checkout);
  }
  await page.route(checkout, route => route.fulfill({ contentType: 'text/html', body: '<h1>Checkout stub</h1>' }));
  await page.locator('[data-checkout]').first().click();
  await expect(page).toHaveURL(checkout);
  expect(calls.filter(c => c[0] === 'track')).toHaveLength(2);
  expect(calls.some(c => ['Purchase', 'InitiateCheckout', 'AddToCart'].includes(c[1]))).toBe(false);
  await page.goto('/upsell');
  await expect.poll(() => calls.filter(c => c[1] === 'ViewContent').length).toBe(2);
  expect(calls.filter(c => c[1] === 'PageView')).toHaveLength(2);
});

test('noscript sends only the PageView fallback when JavaScript is disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const requests = [];
  await page.route('https://www.facebook.com/tr**', route => {
    requests.push(new URL(route.request().url()));
    return route.fulfill({ status: 204 });
  });
  await page.goto('http://127.0.0.1:5174/');
  expect(requests).toHaveLength(1);
  expect(requests[0].searchParams.get('id')).toBe(pixelId);
  expect(requests[0].searchParams.get('ev')).toBe('PageView');
  expect(requests[0].searchParams.get('noscript')).toBe('1');
  await context.close();
});
