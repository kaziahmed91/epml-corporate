// src/index.ts
import type { Core } from "@strapi/strapi";

type Strapi = Core.Strapi;
import { MigrationRunner } from "./bootstrap/migrations/migration-runner";

export default {
  register({ strapi }: { strapi: Strapi }) {
    // Plugin registration
  },

  async bootstrap({ strapi }: { strapi: Strapi }) {
    // Check if seeding should run based on environment
    const shouldSeed = await checkSeedingRequired(strapi);

    if (shouldSeed) {
      console.log("🌱 Starting Strapi migration-based seeding...");

      try {
        const migrationRunner = new MigrationRunner(strapi);
        await migrationRunner.runPendingMigrations();

        console.log("✅ All migrations completed successfully!");
      } catch (error: any) {
        console.error("❌ Migration failed:", error.message);

        // In development, we might want to continue despite errors
        if (process.env.NODE_ENV === "development") {
          console.log(
            "⚠️  Continuing in development mode despite migration errors...",
          );
        } else {
          throw error;
        }
      }
    } else {
      console.log(
        "ℹ️  Skipping seeding - data already exists or seeding disabled",
      );
    }
  },
};

async function checkSeedingRequired(strapi: Strapi): Promise<boolean> {
  // Force seeding if SEED_ENABLE is true
  if (process.env.SEED_ENABLE === "true") {
    return true;
  }

  // Don't seed if explicitly disabled
  if (process.env.SEED_ENABLE === "false") {
    return false;
  }

  // Always seed in development if no data exists
  if (process.env.NODE_ENV === "development") {
    const cityCount = await strapi.entityService.count("api::city.city");
    return cityCount === 0;
  }

  // In production, only seed if explicitly enabled
  if (process.env.NODE_ENV === "production") {
    return process.env.FORCE_PRODUCTION_SEED === "true";
  }

  // Default behavior for staging and other environments
  const cityCount = await strapi.entityService.count("api::city.city");
  return cityCount === 0;
}
