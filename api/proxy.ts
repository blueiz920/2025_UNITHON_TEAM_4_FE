import type { VercelRequest, VercelResponse } from "@vercel/node";

function getHeaders(headersObj: VercelRequest["headers"]): Record<string, string> {
  const headers: Record<string, string> = {};
  Object.entries(headersObj).forEach(([key, value]) => {
    if (typeof value === "string") {
      headers[key] = value;
    } else if (Array.isArray(value)) {
      headers[key] = value.join(", ");
    }
  });
  delete headers.host;
  delete headers['content-length']; // 중요!
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

  console.log("[Vercel Proxy] 실제 요청하는 백엔드 URL:", backendUrl);

  // Content-Type 체크
  const contentType = req.headers["content-type"] || req.headers["Content-Type"] || "";
  let body: any = undefined;

  if (req.method !== "GET" && req.method !== "HEAD") {
    if (contentType.includes("multipart/form-data")) {
      if (Buffer.isBuffer(req.body)) {
        body = req.body;
      } else if (typeof req.body === "string") {
        // multipart인데 string이면 Buffer로 변환
        body = Buffer.from(req.body, "utf-8");
      } else {
        // 이 경우엔 body가 비었거나 파싱이 이미 끝난 object라서 파일이 깨질 수 있음
        body = undefined;
      }
    } else if (contentType.includes("application/json")) {
      body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    } else {
      body = req.body;
    }
  }

  const headers = getHeaders(req.headers);

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
