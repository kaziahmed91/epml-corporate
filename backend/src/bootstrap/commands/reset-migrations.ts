import type { Core } from "@strapi/strapi";

type Strapi = Core.Strapi;

export async function resetMigrations(strapi: Strapi): Promise<void> {
  try {
    // Drop the seed_migrations table
    await strapi.db.connection.schema.dropTableIfExists("seed_migrations");
    console.log("✅ Migration tracking table reset successfully");
  } catch (error) {
    console.error("❌ Failed to reset migration tracking table:", error);
    throw error;
  }
}
