const PUBLIC_CATALOG_PATH = "/garage/public/catalog";
const PUBLIC_VEHICLE_DETAIL_PATH_TEMPLATE = "/garage/public/catalog/{id}";

function getRequiredEnv(name: "NEXT_PUBLIC_GEARGARAGE_API_BASE_URL"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function getPublicApiConfig() {
  return {
    baseUrl: getRequiredEnv("NEXT_PUBLIC_GEARGARAGE_API_BASE_URL"),
    catalogPath: PUBLIC_CATALOG_PATH,
    vehicleDetailPathTemplate: PUBLIC_VEHICLE_DETAIL_PATH_TEMPLATE,
  };
}
