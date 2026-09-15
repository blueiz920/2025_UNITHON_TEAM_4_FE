import "./i18n"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { isOwnBackendRequest } from './mocks/isOwnBackendRequest'

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

function renderApp() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

function renderMockBootstrapFailure() {
  root.render(
    <StrictMode>
      <main
        className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center"
        role="alert"
      >
        <h1 className="text-xl font-semibold">Demo API를 시작할 수 없습니다.</h1>
        <p className="text-sm text-gray-600">
          Mock 환경 초기화에 실패해 Backend 요청을 안전하게 차단했습니다.
        </p>
      </main>
    </StrictMode>,
  );
}

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
        "[MSW] Worker initialization failed. Demo rendering was stopped to prevent Backend fallback.",
        error,
      );
      renderMockBootstrapFailure();
      return;
    }
  }

  renderApp();
}

void bootstrap();
