// src/bootstrap/migrations/migration-runner.ts
import type { Core } from "@strapi/strapi";

type StrapiType = Core.Strapi;
import { SeedMigrationTracker } from "./seed-migration-tracker";
import { seedFoundationData } from "../seeders/foundation-seeder";
import { seedTemplateData } from "../seeders/template-seeder";
import { ProjectSeederFactory } from "../seeders/project-factory";
import { getProjectBySlug } from "../../data/projects";

interface MigrationDefinition {
  id: string;
  name: string;
  description: string;
  dependencies: string[];
  up: (strapi: StrapiType) => Promise<any>;
  down: (strapi: StrapiType) => Promise<void>;
}

export class MigrationRunner {
  private strapi: StrapiType;
  private tracker: SeedMigrationTracker;

  constructor(strapi: StrapiType) {
    this.strapi = strapi;
    this.tracker = new SeedMigrationTracker(strapi);
  }

  private migrations: MigrationDefinition[] = [
    {
      id: "2025-01-01-001",
      name: "create-foundation-data",
      description: "Initial foundation data seeding (cities, locations, types)",
      dependencies: [],
      up: async (strapi: StrapiType) => {
        console.log("🏗️  Running foundation data migration...");
        const maps = await seedFoundationData(strapi);
        return {
          entityCount:
            Object.keys(maps.locationMap).length +
            Object.keys(maps.typeMap).length +
            Object.keys(maps.statusMap).length,
          maps,
        };
      },
      down: async (strapi: StrapiType) => {
        console.log("🗑️  Rolling back foundation data...");
        await this.removeAllEntitiesOfType("api::project.project");
        await this.removeAllEntitiesOfType(
          "api::construction-update.construction-update",
        );
        await this.removeAllEntitiesOfType("api::location.location");
        await this.removeAllEntitiesOfType("api::city.city");
        await this.removeAllEntitiesOfType("api::project-type.project-type");
        await this.removeAllEntitiesOfType(
          "api::project-status.project-status",
        );
      },
    },
    {
      id: "2025-01-01-002",
      name: "create-template-data",
      description: "Feature and amenity templates",
      dependencies: ["2025-01-01-001"],
      up: async (strapi: StrapiType) => {
        console.log("📋 Running template data migration...");
        await seedTemplateData(strapi);
        return { entityCount: 20 };
      },
      down: async (strapi: StrapiType) => {
        console.log("🗑️  Rolling back template data...");
        await this.removeAllEntitiesOfType(
          "api::feature-template.feature-template",
        );
        await this.removeAllEntitiesOfType(
          "api::amenity-template.amenity-template",
        );
      },
    },
    {
      id: "2025-01-01-003",
      name: "create-equity-anirban-project",
      description: "Equity Anirban project with all related data",
      dependencies: ["2025-01-01-001", "2025-01-01-002"],
      up: async (strapi: StrapiType) => {
        console.log("🏢 Running Equity Anirban project migration...");

        // Get foundation data IDs
        const maps = await this.getFoundationMaps(strapi);

        const factory = new ProjectSeederFactory(strapi);
        const projectData = getProjectBySlug("equity-anirban");

        if (!projectData) {
          throw new Error("Equity Anirban project data not found");
        }

        // Set relationship IDs
        const enhancedProjectData = {
          ...projectData,
          project_type: maps.typeMap["Residential"],
          location: maps.locationMap["Agrabad Residential"],
          project_status: maps.statusMap["Ongoing"],
        };

        const project = await factory.seedProject(
          enhancedProjectData,
          "2025-01-01-003",
        );
        return { entityCount: 1, projectId: project.id };
      },
      down: async (strapi: StrapiType) => {
        console.log("🗑️  Rolling back Equity Anirban project...");
        const projects = await strapi.entityService.findMany(
          "api::project.project",
          {
            filters: { slug: "equity-anirban" },
          },
        );

        for (const project of projects) {
          // Remove construction updates first
          const updates = await strapi.entityService.findMany(
            "api::construction-update.construction-update" as any,
            {
              filters: { project: { id: project.id } },
            },
          );

          for (const update of updates) {
            await strapi.entityService.delete(
              "api::construction-update.construction-update",
              update.id,
            );
          }

          // Remove project
          await strapi.entityService.delete("api::project.project", project.id);
        }
      },
    },
  ];

  async runPendingMigrations(): Promise<void> {
    await this.tracker.initializeMigrationTable();

    for (const migration of this.migrations) {
      const isExecuted = await this.tracker.isMigrationExecuted(migration.id);

      if (!isExecuted) {
        console.log(`🚀 Running migration: ${migration.name}`);

        try {
          // Check dependencies
          await this.checkDependencies(migration.dependencies);

          // Execute migration
          const result = await migration.up(this.strapi);

          // Record migration
          await this.tracker.recordMigration({
            id: migration.id,
            name: migration.name,
            environment: process.env.NODE_ENV || "development",
            metadata: {
              tables: this.extractTableNames(migration.description),
              description: migration.description,
              entityCount: result?.entityCount || 0,
            },
          });

          console.log(`✅ Completed migration: ${migration.name}`);
        } catch (error: any) {
          console.error(
            `❌ Failed migration: ${migration.name}`,
            error.message,
          );
          throw error;
        }
      } else {
        console.log(
          `⏭️  Skipping already executed migration: ${migration.name}`,
        );
      }
    }
  }

  async rollbackMigration(migrationId: string): Promise<void> {
    const migration = this.migrations.find((m) => m.id === migrationId);
    if (!migration) {
      throw new Error(`Migration not found: ${migrationId}`);
    }

    const isExecuted = await this.tracker.isMigrationExecuted(migrationId);
    if (!isExecuted) {
      console.log(
        `⏭️  Migration not executed, nothing to rollback: ${migrationId}`,
      );
      return;
    }

    console.log(`🔄 Rolling back migration: ${migration.name}`);

    try {
      await migration.down(this.strapi);
      await this.tracker.removeMigration(migrationId);
      console.log(`✅ Successfully rolled back: ${migration.name}`);
    } catch (error: any) {
      console.error(
        `❌ Failed to rollback migration: ${migration.name}`,
        error.message,
      );
      throw error;
    }
  }

  async getMigrationStatus(): Promise<any[]> {
    return await this.tracker.getAllMigrations();
  }

  private async checkDependencies(dependencies: string[]): Promise<void> {
    for (const depId of dependencies) {
      const isExecuted = await this.tracker.isMigrationExecuted(depId);
      if (!isExecuted) {
        throw new Error(`Dependency not met: ${depId}`);
      }
    }
  }

  private extractTableNames(description: string): string[] {
    const tableNames: string[] = [];
    if (description.includes("cities")) tableNames.push("cities");
    if (description.includes("locations")) tableNames.push("locations");
    if (description.includes("projects")) tableNames.push("projects");
    if (description.includes("templates")) tableNames.push("templates");
    return tableNames;
  }

  private async removeAllEntitiesOfType(entityType: string): Promise<void> {
    const entities = await this.strapi.entityService.findMany(
      entityType as any,
    );
    const entitiesArray = Array.isArray(entities) ? entities : [entities];
    for (const entity of entitiesArray) {
      await this.strapi.entityService.delete(entityType as any, entity.id);
    }
    console.log(
      `🗑️  Removed ${entitiesArray.length} entities of type ${entityType}`,
    );
  }

  private async getFoundationMaps(strapi: StrapiType): Promise<any> {
    // Get existing foundation data IDs
    const cities = await strapi.entityService.findMany("api::city.city");
    const locations = await strapi.entityService.findMany(
      "api::location.location",
    );
    const types = await strapi.entityService.findMany(
      "api::project-type.project-type",
    );
    const statuses = await strapi.entityService.findMany(
      "api::project-status.project-status",
    );

    const locationMap: Record<string, number> = {};
    const typeMap: Record<string, number> = {};
    const statusMap: Record<string, number> = {};

    locations.forEach((loc: any) => {
      locationMap[loc.Name] = loc.id;
    });

    types.forEach((type: any) => {
      typeMap[type.Type] = type.id;
    });

    statuses.forEach((status: any) => {
      statusMap[status.Statuses] = status.id;
    });

    return { locationMap, typeMap, statusMap };
  }
}
