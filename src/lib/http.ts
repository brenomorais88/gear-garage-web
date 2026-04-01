export class HttpError extends Error {
  status: number;
  url: string;
  responseBody: string | null;

  constructor(status: number, statusText: string, url: string, responseBody?: string) {
    super(`Public API request failed: ${status} ${statusText} (${url})`);
    this.status = status;
    this.url = url;
    this.responseBody = responseBody ?? null;
    this.name = "HttpError";
  }
}

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export function serializeFetchError(error: unknown): Record<string, unknown> {
  if (error instanceof HttpError) {
    return {
      name: error.name,
      message: error.message,
      status: error.status,
      url: error.url,
      responseBodySnippet: error.responseBody,
    };
  }
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return { value: String(error) };
}

export async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const method = init?.method ?? "GET";
  console.info("[GearGarage][http] fetch start", { url, method });

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch (cause) {
    console.error("[GearGarage][http] fetch network error", {
      url,
      method,
      error: serializeFetchError(cause),
    });
    throw cause;
  }

  const bodyText = await response.text().catch(() => "");
  console.info("[GearGarage][http] fetch response", {
    url,
    method,
    status: response.status,
    ok: response.ok,
    contentType: response.headers.get("content-type"),
    bodyLength: bodyText.length,
  });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText, url, bodyText.slice(0, 500));
  }

  try {
    return JSON.parse(bodyText) as T;
  } catch (parseError) {
    console.error("[GearGarage][http] JSON parse error", {
      url,
      method,
      snippet: bodyText.slice(0, 400),
      error: serializeFetchError(parseError),
    });
    throw new Error(`Public API returned non-JSON (${url})`);
  }
}

export { joinUrl };
