const PUBLIC_CATALOG_PATH = "/garage/public/catalog";
const PUBLIC_VEHICLE_DETAIL_PATH_TEMPLATE = "/garage/public/catalog/{id}";

/**
 * Logs how public env vars look at runtime.
 * On the server, Vercel injects vars into the Node process; in the browser, only NEXT_PUBLIC_* are available.
 */
export function logPublicRuntimeEnv(phase: string): void {
  const base = process.env.NEXT_PUBLIC_GEARGARAGE_API_BASE_URL;
  let protocol: string | null = null;
  try {
    if (base) protocol = new URL(base).protocol;
  } catch {
    protocol = "invalid-url";
  }

  console.info(`[GearGarage][env] ${phase}`, {
    NEXT_PUBLIC_GEARGARAGE_API_BASE_URL: base ?? "(undefined — set in Vercel Project Settings → Environment Variables, then redeploy)",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "(undefined)",
    inferredApiBaseProtocol: protocol,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_REGION: process.env.VERCEL_REGION,
  });
}

export function getPublicApiConfig() {
  // Must use a static `process.env.NEXT_PUBLIC_*` reference so Next inlines it in the
  // client bundle. Dynamic access `process.env[name]` is left undefined in the browser.
  const baseUrl = process.env.NEXT_PUBLIC_GEARGARAGE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("Missing required env var: NEXT_PUBLIC_GEARGARAGE_API_BASE_URL");
  }
  return {
    baseUrl,
    catalogPath: PUBLIC_CATALOG_PATH,
    vehicleDetailPathTemplate: PUBLIC_VEHICLE_DETAIL_PATH_TEMPLATE,
  };
}
