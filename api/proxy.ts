import type { VercelRequest, VercelResponse } from "@vercel/node";

function getHeaders(headersObj: VercelRequest["headers"]): Record<string, string> {
  const headers: Record<string, string> = {};
  Object.entries(headersObj).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey === "host" || lowerKey === "content-length") return;
    if (typeof value === "string") headers[key] = value;
    else if (Array.isArray(value)) headers[key] = value.join(", ");
  });
  return headers;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url, ...params } = req.query;
  if (!url || typeof url !== "string") {
    res.status(400).send("Missing target URL");
    return;
  }

  const paramString = Object.entries(params)
    .filter(([k, v]) => v !== undefined && v !== "" && k !== "url")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`)
    .join("&");
  const backendUrl =
    decodeURIComponent(url) + (paramString ? (url.includes("?") ? "&" : "?") + paramString : "");

  const headers = getHeaders(req.headers);

  // ---- 🔥 body 분기 처리 ----
  let body: any = undefined;
  const contentType = req.headers["content-type"] || req.headers["Content-Type"] || "";

  if (req.method !== "GET" && req.method !== "HEAD") {
    if (contentType.startsWith("multipart/form-data")) {
      // 파일 업로드: Buffer 그대로 전달
      body = req.body;
    } else if (contentType.includes("application/json")) {
      // JSON: stringify해서 전달
      body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    } else if (typeof req.body === "string" || req.body instanceof Buffer) {
      // 그 외: 문자열 혹은 버퍼면 그대로 전달
      body = req.body;
    }
  }

  try {
    const fetchRes = await fetch(backendUrl, {
      method: req.method,
      headers,
      body,
    });
    res.status(fetchRes.status);
    fetchRes.headers.forEach((v, k) => res.setHeader(k, v));
    const buffer = await fetchRes.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("[Vercel Proxy] fetch 요청 실패:", error);
    res.status(500).send("프록시 요청에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
}
