import type { VercelRequest, VercelResponse } from "@vercel/node";

function getHeaders(headersObj: VercelRequest["headers"]): Record<string, string> {
  const headers: Record<string, string> = {};
  Object.entries(headersObj).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();
    // 'host'는 항상 제거
    // 'content-length'는 fetch가 자동으로 계산하므로 제거 (특히 raw body 보낼 때 필수)
    if (lowerKey === "host" || lowerKey === "content-length") {
      return;
    }
    if (typeof value === "string") {
      headers[key] = value;
    } else if (Array.isArray(value)) {
      headers[key] = value.join(", ");
    }
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

  console.log("[Vercel Proxy] 실제 요청하는 백엔드 URL:", backendUrl);

  let body: BodyInit | undefined = undefined; // fetch API의 BodyInit 타입 사용
  const contentType = req.headers['content-type']; // Content-Type 헤더 가져오기

  if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
    if (contentType && contentType.startsWith("multipart/form-data")) {
      // multipart/form-data는 Buffer/raw 형태로 오므로 그대로 전달
      body = req.body; // VercelRequest['body']는 Buffer를 포함할 수 있음
    } else if (typeof req.body === "object") {
      // 일반적인 JSON 또는 form-urlencoded (객체로 파싱된 경우)
      body = JSON.stringify(req.body);
      // Content-Type이 JSON이 아닌 경우 (예: form-urlencoded를 JSON.stringify하면 안됨)
      // 이 부분은 클라이언트가 보내는 Content-Type을 정확히 알아야 함.
      // 안전하게 가려면, 특정 Content-Type이 아니면 JSON.stringify를 하지 않는 것도 방법.
      // 하지만 대부분의 경우 JSON.stringify(object)는 문제 없습니다.
      // (단, fetch headers에 Content-Type: application/json을 명시해야 함)
      // 현재 getHeaders에서 Content-Type을 그대로 전달하고 있으므로, 클라이언트가 application/json으로 보낸다면 문제 없음.
    } else if (typeof req.body === "string") {
      // 이미 문자열인 경우 (예: text/plain, 또는 자동으로 파싱되지 않은 경우)
      body = req.body;
    } else if (req.body instanceof Buffer) {
        // 혹시 모르니 Buffer 타입도 명시적으로 처리
        body = req.body;
    }
  }

  const headers = getHeaders(req.headers);

  // multipart/form-data를 위한 Content-Type 수정 (fetch가 알아서 boundary 처리)
  // 단, req.body가 Buffer로 들어왔을 때 Content-Type 헤더를 다시 설정하지 않으면,
  // Node.js fetch가 Content-Type을 application/octet-stream 등으로 기본 설정할 수 있습니다.
  // 원본 Content-Type을 유지하는 것이 중요합니다.
  if (contentType && contentType.startsWith("multipart/form-data")) {
      // 만약 Node.js fetch가 Content-Type을 잘못 설정한다면, 여기서 강제로 원본 값을 넣어줄 수 있습니다.
      // headers['Content-Type'] = contentType;
      // 하지만 getHeaders에서 제거하지 않았으므로, 원본 헤더가 그대로 전달될 것입니다.
      // 이 부분은 보통 fetch가 알아서 잘 처리합니다.
  } else if (typeof req.body === "object" && body === JSON.stringify(req.body) && !headers['content-type']) {
      // req.body가 객체이고 JSON.stringify를 거쳤는데 Content-Type이 없으면 추가
      // headers['Content-Type'] = 'application/json'; // 클라이언트에서 이 헤더를 보내지 않는다면 추가
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
