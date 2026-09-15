import "./i18n"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { isOwnBackendRequest } from './mocks/isOwnBackendRequest'

async function bootstrap() {
  if (import.meta.env.VITE_API_MODE === "mock") {
    try {
      const { worker } = await import("./mocks/browser");

      await worker.start({
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
        onUnhandledRequest: (request, print) => {
          if (isOwnBackendRequest(request)) print.error();
        },
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
