const BACKEND_ENDPOINT_PATTERNS = [
  /\/auth\/(?:login|signup)$/,
  /\/users(?:\/(?:profile-image|password))?$/,
  /\/festivals\/(?:list|search|likes|info|detailIntro|detailInfo|locationFood)$/,
  /\/festivals\/[^/]+\/like$/,
  /\/posts$/,
  /\/posts\/[^/]+$/,
  /\/posts\/[^/]+\/comments$/,
  /\/postLikes\/(?:myLikes|[^/]+\/like)$/,
] as const;

function isKnownBackendPath(pathname: string) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  return BACKEND_ENDPOINT_PATTERNS.some((pattern) =>
    pattern.test(normalizedPath),
  );
}

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

function getConfiguredBackendBasePaths(requestOrigin: string) {
  const configuredBaseUrl = String(
    import.meta.env.VITE_UNITHON_SERVER_URL || "",
  ).trim();

  if (!configuredBaseUrl) return [];

  try {
    const baseUrl = new URL(configuredBaseUrl, requestOrigin);
    const basePath = normalizePath(baseUrl.pathname);
    const paths = [basePath];

    if (basePath.endsWith("/v1")) {
      paths.push(basePath.slice(0, -2) + "v2");
    }

    return paths.map((path) => ({ origin: baseUrl.origin, path }));
  } catch {
    return [];
  }
}

function isPathWithinBase(pathname: string, basePath: string) {
  const normalizedPath = normalizePath(pathname);
  const normalizedBasePath = normalizePath(basePath);

  return (
    normalizedBasePath === "/" ||
    normalizedPath === normalizedBasePath ||
    normalizedPath.startsWith(`${normalizedBasePath}/`)
  );
}

function isOwnBackendTarget(target: URL, requestOrigin: string) {
  const configuredBasePaths = getConfiguredBackendBasePaths(requestOrigin);

  if (configuredBasePaths.length > 0) {
    return configuredBasePaths.some(
      ({ origin, path }) =>
        target.origin === origin && isPathWithinBase(target.pathname, path),
    );
  }

  return target.origin === requestOrigin && isKnownBackendPath(target.pathname);
}

/**
 * Distinguishes this app's Backend API from external resources and assets.
 * Production API calls are wrapped in /api/proxy?url=..., while local calls
 * can target the Backend directly or use a same-origin relative URL.
 */
export function isOwnBackendRequest(request: Request) {
  const requestUrl = new URL(request.url);

  if (requestUrl.pathname === "/api/proxy") {
    const targetParam = requestUrl.searchParams.get("url");

    // A proxy request without a target is malformed but still belongs to the
    // app's Backend boundary, so it must not fall through to the network.
    if (!targetParam) return true;

    try {
      const targetUrl = new URL(targetParam, requestUrl.origin);
      return isOwnBackendTarget(targetUrl, requestUrl.origin);
    } catch {
      return true;
    }
  }

  return isOwnBackendTarget(requestUrl, requestUrl.origin);
}
