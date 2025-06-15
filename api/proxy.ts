import type { VercelRequest, VercelResponse } from "@vercel/node";

// 헤더 조립 함수
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

  // --- body 조립
  let body: any = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    const contentType = req.headers["content-type"] || req.headers["Content-Type"] || "";
    if (contentType.includes("application/json")) {
      // json 요청 → string 변환
      body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
      headers["Content-Type"] = "application/json";
    } else if (contentType.includes("multipart/form-data")) {
      // formdata 요청 → Buffer로 변환(수동 파싱)
      // vercel은 req.body가 Buffer로 올 수 있음(최신)
      if (Buffer.isBuffer(req.body)) {
        body = req.body;
      } else {
        // req.body가 undefined일 수 있으니 stream에서 직접 읽어오기
        body = await new Promise<Buffer>((resolve, reject) => {
          const chunks: Buffer[] = [];
          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", () => resolve(Buffer.concat(chunks)));
          req.on("error", (err) => reject(err));
        });
      }
      // Content-Type(경계선 포함) 헤더 유지
    } else {
      // 그 외는 그냥 string으로 변환(혹은 Buffer 유지)
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
