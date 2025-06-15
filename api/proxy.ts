// /api/proxy.ts
export const config = {
  runtime: "edge"
};

export default async function handler(req: Request) {
  // 1. target URL 추출 (GET, POST 모두 query string에서)
  const url = new URL(req.url);
  const backendUrl = url.searchParams.get("url");
  if (!backendUrl) {
    return new Response("Missing target URL", { status: 400 });
  }

  // 2. (선택) 나머지 파라미터 조합
  const params = new URLSearchParams(url.searchParams);
  params.delete("url");
  const paramString = params.toString();
  const proxyTarget =
    decodeURIComponent(backendUrl) +
    (paramString ? (backendUrl.includes("?") ? "&" : "?") + paramString : "");

  // 3. 헤더 복사 (host, content-length 등 필요없는 건 제거)
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  // 4. 프록시 fetch (body는 GET/HEAD 제외하고 stream 그대로)
  const proxyRes = await fetch(proxyTarget, {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req.body, // stream/raw
    redirect: "manual"
  });

  // 5. 응답 relay
  const respHeaders = new Headers(proxyRes.headers);
  // 필요시 respHeaders.delete("content-encoding") 등 추가 조작 가능

  return new Response(proxyRes.body, {
    status: proxyRes.status,
    headers: respHeaders,
  });
}
