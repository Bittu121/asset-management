/**
 * Next.js startup hook — `register()` runs once when the server boots and
 * completes before any request is handled. We use it to connect to MongoDB
 * and run the idempotent bootstrap (system roles + admin account).
 *
 * Guarded to the Node.js runtime so mongoose is never bundled for Edge.
 * Dynamic imports keep the Node-only code out of the Edge bundle.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const connectDB = (await import("./backend/config/db")).default;
    const { ensureBootstrap } = await import("./backend/config/bootstrap");

    await connectDB();
    await ensureBootstrap();
  }
}
