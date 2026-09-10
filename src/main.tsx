import "./i18n"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function bootstrap() {
  if (import.meta.env.VITE_API_MODE === "mock") {
    try {
      const { worker } = await import("./mocks/browser");

      await worker.start({
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
        onUnhandledRequest: "bypass",
      });
    } catch (error) {
      console.error(
        "[MSW] Worker initialization failed. Continuing without request interception.",
        error,
      );
    }
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

void bootstrap();
