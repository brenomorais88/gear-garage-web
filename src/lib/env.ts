const PUBLIC_CATALOG_PATH = "/garage/public/catalog";
const PUBLIC_VEHICLE_DETAIL_PATH_TEMPLATE = "/garage/public/catalog/{id}";

function getRequiredEnv(name: "NEXT_PUBLIC_GEARGARAGE_API_BASE_URL"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

/**
 * Logs how public env vars look at runtime (Vercel injects these into the Node process).
 * Safe to call from Server Components, instrumentation, or services — never runs in the browser bundle for RSC data path.
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
  return {
    baseUrl: getRequiredEnv("NEXT_PUBLIC_GEARGARAGE_API_BASE_URL"),
    catalogPath: PUBLIC_CATALOG_PATH,
    vehicleDetailPathTemplate: PUBLIC_VEHICLE_DETAIL_PATH_TEMPLATE,
  };
}
