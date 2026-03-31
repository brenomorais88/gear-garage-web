const requiredVars = [
  "NEXT_PUBLIC_GEARGARAGE_API_BASE_URL",
  "NEXT_PUBLIC_GEARGARAGE_PUBLIC_CATALOG_PATH",
  "NEXT_PUBLIC_GEARGARAGE_PUBLIC_VEHICLE_DETAIL_PATH",
] as const;

function getRequiredEnv(name: (typeof requiredVars)[number]): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function getPublicApiConfig() {
  // Reads every required env key at runtime and keeps lint strict.
  const resolved = Object.fromEntries(requiredVars.map((name) => [name, getRequiredEnv(name)])) as Record<
    (typeof requiredVars)[number],
    string
  >;

  return {
    baseUrl: resolved.NEXT_PUBLIC_GEARGARAGE_API_BASE_URL,
    catalogPath: resolved.NEXT_PUBLIC_GEARGARAGE_PUBLIC_CATALOG_PATH,
    vehicleDetailPathTemplate: resolved.NEXT_PUBLIC_GEARGARAGE_PUBLIC_VEHICLE_DETAIL_PATH,
  };
}
