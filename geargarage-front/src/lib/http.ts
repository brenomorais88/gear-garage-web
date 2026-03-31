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

export async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new HttpError(response.status, response.statusText, url, body.slice(0, 500));
  }

  return (await response.json()) as T;
}

export { joinUrl };
