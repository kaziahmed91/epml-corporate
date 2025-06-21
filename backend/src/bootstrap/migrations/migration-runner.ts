// src/bootstrap/migrations/migration-runner.ts
import type { Core } from "@strapi/strapi";

type Strapi = Core.Strapi;
import { SeedMigrationTracker } from "./seed-migration-tracker";
import { seedFoundationData } from "../seeders/foundation-seeder";
import { seedTemplateData } from "../seeders/template-seeder";
import { ProjectSeederFactory } from "../seeders/project-factory";
import { getProjectBySlug } from "..";
import migrationsData from "../seeders/data/migrations.json";
import {
  ErrorReporter,
  MigrationError,
  DependencyError,
  EntityError,
} from "../utils/errors";

interface MigrationDefinition {
  id: string;
  name: string;
  description: string;
  dependencies: string[];
  affectedEntities: string[];
  affectedTables: string[];
  up: (strapi: Strapi) => Promise<any>;
  down: (strapi: Strapi) => Promise<void>;
}

type EntityId = string | number;

export class MigrationRunner {
  private strapi: Strapi;
  private tracker: SeedMigrationTracker;
  private migrations: MigrationDefinition[];
  private errorReporter: ErrorReporter;

  constructor(strapi: Strapi) {
    this.strapi = strapi;
    this.tracker = new SeedMigrationTracker(strapi);
    this.migrations = this.initializeMigrations();
    this.errorReporter = ErrorReporter.getInstance();
  }

  private initializeMigrations(): MigrationDefinition[] {
    return [
      {
        ...migrationsData.migrations[0],
        up: async (strapi: Strapi) => {
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
        down: async (strapi: Strapi) => {
          console.log("🗑️  Rolling back foundation data...");
          for (const entityType of migrationsData.migrations[0]
            .affectedEntities) {
            await this.removeAllEntitiesOfType(entityType);
          }
        },
      },
      {
        ...migrationsData.migrations[1],
        up: async (strapi: Strapi) => {
          console.log("📋 Running template data migration...");
          await seedTemplateData(strapi);
          return { entityCount: 20 };
        },
        down: async (strapi: Strapi) => {
          console.log("🗑️  Rolling back template data...");
          for (const entityType of migrationsData.migrations[1]
            .affectedEntities) {
            await this.removeAllEntitiesOfType(entityType);
          }
        },
      },
      {
        ...migrationsData.migrations[2],
        up: async (strapi: Strapi) => {
          console.log("🏢 Running Equity Anirban project v2 migration...");
          const maps = await this.getFoundationMaps(strapi);
          const factory = new ProjectSeederFactory(strapi);
          const projectData = await getProjectBySlug("equity-anirban");

          if (!projectData) {
            throw new Error("Equity Anirban v2 project data not found");
          }

          const enhancedProjectData = {
            ...projectData,
            project_type: maps.typeMap[projectData.project_type],
            location: maps.locationMap[projectData.location],
            project_status: maps.statusMap[projectData.project_status],
          };

          const project = await factory.seedProject(
            enhancedProjectData,
            "2025-01-01-003",
          );
          return { entityCount: 1, projectId: project.id };
        },
        down: async (strapi: Strapi) => {
          console.log("🗑️  Rolling back Equity Anirban v2 project...");
          await this.rollbackProject("equity-anirban");
        },
      },
      {
        ...migrationsData.migrations[3],
        up: async (strapi: Strapi) => {
          console.log("🏢 Running Equity Aziz Neer project v2 migration...");
          const maps = await this.getFoundationMaps(strapi);
          const factory = new ProjectSeederFactory(strapi);
          const projectData = await getProjectBySlug("equity-aziz-neer");

          if (!projectData) {
            throw new Error("Equity Aziz Neer v2 project data not found");
          }

          const enhancedProjectData = {
            ...projectData,
            project_type: maps.typeMap[projectData.project_type],
            location: maps.locationMap[projectData.location],
            project_status: maps.statusMap[projectData.project_status],
          };

          const seededProject = await factory.seedProject(
            enhancedProjectData,
            "2025-01-01-004",
          );
          return { entityCount: 1, projectId: seededProject.id };
        },
        down: async (strapi: Strapi) => {
          console.log("🗑️  Rolling back Equity Aziz Neer v2 project...");
          await this.rollbackProject("equity-aziz-neer");
        },
      },
      {
        ...migrationsData.migrations[4],
        up: async (strapi: Strapi) => {
          console.log("🏢 Running Equity MIR Trade Center project migration...");
          const maps = await this.getFoundationMaps(strapi);
          const factory = new ProjectSeederFactory(strapi);
          const projectData = await getProjectBySlug("equity-mir-trade-center");

          if (!projectData) {
            throw new Error("Equity MIR Trade Center v2 project data not found");
          }

          const enhancedProjectData = {
            ...projectData,
            project_type: maps.typeMap[projectData.project_type],
            location: maps.locationMap[projectData.location],
            project_status: maps.statusMap[projectData.project_status],
          };

          const seededProject = await factory.seedProject(
            enhancedProjectData,
            "2025-01-01-005",
          );
          return { entityCount: 1, projectId: seededProject.id };
        },
        down: async (strapi: Strapi) => {
          console.log("🗑️  Rolling back Equity MIR Trade Center project...");
          await this.rollbackProject("equity-mir-trade-center");
        },
      },
    ];
  }

  async runPendingMigrations(): Promise<void> {
    await this.tracker.initializeMigrationTable();
    this.errorReporter.clearErrors();

    for (const migration of this.migrations) {
      const isExecuted = await this.tracker.isMigrationExecuted(migration.id);

      if (!isExecuted) {
        console.log(`🚀 Running migration: ${migration.name}`);

        try {
          await this.checkDependencies(migration.dependencies);
          const result = await migration.up(this.strapi);
          await this.recordMigration(migration, result);
          console.log(`✅ Completed migration: ${migration.name}`);
        } catch (error: any) {
          const migrationError = new MigrationError(
            error.message,
            migration.id,
            migration.name,
            { originalError: error },
          );

          this.errorReporter.reportError(migrationError, {
            migrationId: migration.id,
            migrationName: migration.name,
          });
          console.log(JSON.stringify(error, null, 2));
          throw migrationError;
        }
      } else {
        console.log(
          `⏭️  Skipping already executed migration: ${migration.name}`,
        );
      }
    }

    if (this.errorReporter.hasErrors()) {
      console.error(this.errorReporter.getErrorSummary());
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
        throw new DependencyError(
          "unknown", // We don't know the migration ID yet
          "unknown", // We don't know the migration name yet
          depId,
        );
      }
    }
  }

  private async recordMigration(
    migration: MigrationDefinition,
    result: any,
  ): Promise<void> {
    await this.tracker.recordMigration({
      id: migration.id,
      name: migration.name,
      environment: process.env.NODE_ENV || "development",
      metadata: {
        tables: migration.affectedTables,
        description: migration.description,
        entityCount: result?.entityCount || 0,
      },
    });
  }

  private async removeAllEntitiesOfType(entityType: string): Promise<void> {
    const entities = await this.strapi.entityService.findMany(
      entityType as any,
    );
    const entitiesArray = Array.isArray(entities) ? entities : [entities];

    for (const entity of entitiesArray) {
      try {
        await this.strapi.entityService.delete(entityType as any, entity.id);
      } catch (error: any) {
        this.errorReporter.reportError(
          new EntityError(`Failed to delete entity`, entityType, entity.id, {
            originalError: error,
          }),
          { operation: "delete" },
        );
      }
    }

    console.log(
      `🗑️  Removed ${entitiesArray.length} entities of type ${entityType}`,
    );
  }

  private async rollbackProject(slug: string): Promise<void> {
    const projects = await this.strapi.entityService.findMany(
      "api::project.project",
      {
        filters: { slug },
      },
    );

    for (const project of projects) {
      await this.removeProjectRelatedData(project.id);
      await this.strapi.entityService.delete(
        "api::project.project",
        project.id,
      );
    }
  }

  private async removeProjectRelatedData(projectId: EntityId): Promise<void> {
    const relatedEntities = [
      "api::construction-update.construction-update",
      "api::testimonial.testimonial",
      // Add other related entity types here
    ];

    for (const entityType of relatedEntities) {
      const entities = await this.strapi.entityService.findMany(
        entityType as any,
        {
          filters: { project: { id: projectId } },
        },
      );

      for (const entity of entities) {
        try {
          await this.strapi.entityService.delete(entityType as any, entity.id);
        } catch (error: any) {
          this.errorReporter.reportError(
            new EntityError(
              `Failed to delete related entity`,
              entityType,
              entity.id,
              { originalError: error, projectId },
            ),
            { operation: "delete_related" },
          );
        }
      }
    }
  }

  private async getFoundationMaps(strapi: Strapi): Promise<any> {
    const [cities, locations, types, statuses] = await Promise.all([
      strapi.entityService.findMany("api::city.city"),
      strapi.entityService.findMany("api::location.location"),
      strapi.entityService.findMany("api::project-type.project-type"),
      strapi.entityService.findMany("api::project-status.project-status"),
    ]);

    return {
      locationMap: this.createEntityMap(locations, "Name"),
      typeMap: this.createEntityMap(types, "Type"),
      statusMap: this.createEntityMap(statuses, "Statuses"),
    };
  }

  private createEntityMap(
    entities: any[],
    keyField: string,
  ): Record<string, number> {
    return entities.reduce((map: Record<string, number>, entity: any) => {
      map[entity[keyField]] = entity.id;
      return map;
    }, {});
  }

  private async getAllProjectFiles(): Promise<any[]> {
    const fs = require("fs");
    const path = require("path");
    const projectsDir = path.join(__dirname, "../seeders/data/projects");

    try {
      console.log("📂 Reading projects from directory:", projectsDir);
      const files = await fs.promises.readdir(projectsDir);
      console.log("📄 Found files:", files);

      const projectFiles = [];

      for (const file of files) {
        if (file.endsWith(".json")) {
          console.log(`📖 Processing file: ${file}`);
          const filePath = path.join(projectsDir, file);
          const content = await fs.promises.readFile(filePath, "utf8");
          const projectData = JSON.parse(content);
          console.log(
            `✅ Successfully parsed ${file} - Project: ${projectData.name}`,
          );
          projectFiles.push(projectData);
        }
      }

      console.log(`📊 Total projects loaded: ${projectFiles.length}`);
      return projectFiles;
    } catch (error) {
      console.error("❌ Error reading project files:", error);
      throw error;
    }
  }
}
