export type SearchParamValue = string | string[] | undefined;
export type SearchParamsRecord = Record<string, SearchParamValue>;

/** For mergeQuery / listing controls; works with URLSearchParams and Next.js ReadonlyURLSearchParams. */
export function searchParamsLikeToRecord(params: Pick<URLSearchParams, "forEach">): SearchParamsRecord {
  const record: SearchParamsRecord = {};
  params.forEach((value, key) => {
    record[key] = value;
  });
  return record;
}

export function toURLSearchParams(searchParams: SearchParamsRecord): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      if (value[0]) params.set(key, value[0]);
    } else if (value) {
      params.set(key, value);
    }
  }
  return params;
}

export function mergeQuery(
  current: SearchParamsRecord,
  updates: Record<string, string | number | undefined>,
): string {
  const params = toURLSearchParams(current);
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}
