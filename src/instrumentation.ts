import { logPublicRuntimeEnv } from "@/lib/env";

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }
  logPublicRuntimeEnv("instrumentation.register (server cold start)");
}
