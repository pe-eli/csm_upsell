import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import App from '../src/App.jsx';

// An independent root exercises real rerenders and unmount/remount cycles.
export function exerciseReactLifecycle() {
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  flushSync(() => root.render(<React.StrictMode><App /></React.StrictMode>));
  flushSync(() => root.render(<React.StrictMode><App /></React.StrictMode>));
  flushSync(() => root.unmount());
  const secondRoot = createRoot(container);
  flushSync(() => secondRoot.render(<React.StrictMode><App /></React.StrictMode>));
  flushSync(() => secondRoot.unmount());
  container.remove();
}
