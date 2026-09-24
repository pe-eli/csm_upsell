// Document-scoped state survives StrictMode effects, rerenders and remounts.
// A full navigation/reload creates a new document and a new pair of events.
export function trackOfferView() {
  const state = window.__merMetaPixel;
  if (!state?.initialized || state.viewContent || typeof window.fbq !== 'function') return;

  state.viewContent = true;
  window.fbq('track', 'ViewContent', {
    content_name: 'Método Emprego Rápido',
    content_ids: ['metodo_emprego_rapido'],
    content_type: 'product',
    value: 47.00,
    currency: 'BRL',
  });
}
