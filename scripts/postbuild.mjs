/**
 * Notifica IndexNow tras el build de producción.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
  const result = spawnSync(
    "npx",
    ["tsx", join(ROOT, "scripts", "ping-indexnow.ts")],
    { stdio: "inherit", shell: true, cwd: ROOT }
  );

  if (result.status !== 0) {
    console.warn("[indexnow] Notificación opcional no completada.");
  }
}
