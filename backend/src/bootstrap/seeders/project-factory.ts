// src/bootstrap/seeders/project-factory.ts
import type { Core } from "@strapi/strapi";

type Strapi = Core.Strapi;
import { StrapiSeeder } from "../utils/seeder-helper";
import { ProjectData, ConstructionUpdate } from "../../types/project-types";

interface SeedResult {
  success: boolean;
  project?: any;
  error?: string;
  projectName?: string;
}

export class ProjectSeederFactory {
  private strapi: Strapi;
  private seeder: StrapiSeeder;

  constructor(strapi: Strapi) {
    this.strapi = strapi;
    this.seeder = new StrapiSeeder(strapi);
  }

  async seedProject(
    projectData: ProjectData,
    migrationId: string | null = null,
  ): Promise<any> {
    console.log(`🏢 Seeding project: ${projectData.name}`);

    try {
      // Validate project data
      await this.validateProjectData(projectData);

      // Process and create project
      const processedData = await this.seeder.createWithComponents(
        "api::project.project",
        projectData,
      );

      // Seed related data
      await this.seedRelatedData(processedData, projectData, migrationId);

      console.log(
        `✅ Successfully seeded project: ${processedData.name} (ID: ${processedData.id})`,
      );
      return processedData;
    } catch (error: any) {
      console.error(
        `❌ Failed to seed project ${projectData.name}:`,
        error.message,
      );
      throw error;
    }
  }

  async seedMultipleProjects(
    projectsData: ProjectData[],
    migrationId: string | null = null,
  ): Promise<SeedResult[]> {
    console.log(`🏗️ Starting to seed ${projectsData.length} projects...`);
    const results: SeedResult[] = [];

    for (const projectData of projectsData) {
      console.log(`\n📝 Processing project: ${projectData.name}`);
      try {
        const project = await this.seedProject(projectData, migrationId);
        console.log(`✅ Successfully seeded project: ${projectData.name}`);
        results.push({ success: true, project });
      } catch (error: any) {
        console.error(
          `❌ Failed to seed project ${projectData.name}:`,
          error.message,
        );
        results.push({
          success: false,
          error: error.message,
          projectName: projectData.name,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failedCount = results.filter((r) => !r.success).length;
    console.log(`\n📊 Seeding Summary:`);
    console.log(`✅ Successfully seeded: ${successCount} projects`);
    console.log(`❌ Failed to seed: ${failedCount} projects`);

    return results;
  }

  private async seedRelatedData(
    project: any,
    projectData: ProjectData,
    migrationId: string | null,
  ): Promise<void> {
    // Seed construction updates
    if (projectData.constructionUpdates) {
      await this.seedConstructionUpdates(
        project.id,
        projectData.constructionUpdates,
        migrationId,
      );
    }

    // Seed project-specific testimonials
    if (projectData.testimonials) {
      await this.seedTestimonials(
        project.id,
        projectData.testimonials,
        migrationId,
      );
    }
  }

  private async seedConstructionUpdates(
    projectId: number,
    updates: ConstructionUpdate[],
    migrationId: string | null,
  ): Promise<void> {
    for (const updateData of updates) {
      const update = await this.seeder.findOrCreate(
        "api::construction-update.construction-update",
        { month: updateData.month, year: updateData.year, project: projectId },
        { ...updateData, project: projectId },
      );
      console.log(`📊 Seeded construction update: ${update.stage}`);
    }
  }

  private async seedTestimonials(
    projectId: number,
    testimonials: any[],
    migrationId: string | null,
  ): Promise<void> {
    for (const testimonialData of testimonials) {
      const testimonial = await this.seeder.createEntry(
        "api::testimonial.testimonial",
        {
          ...testimonialData,
          project: projectId,
        },
      );
      console.log(`💬 Seeded testimonial: ${testimonial.customerName}`);
    }
  }

  private async validateProjectData(projectData: ProjectData): Promise<void> {
    const requiredFields = ["name", "slug", "address"];
    await this.seeder.validateRequiredFields(projectData, requiredFields);

    // Validate relationships exist
    if (projectData.project_type) {
      const typeExists = await this.strapi.entityService.findOne(
        "api::project-type.project-type",
        projectData.project_type,
      );
      if (!typeExists) {
        throw new Error(`Invalid project_type ID: ${projectData.project_type}`);
      }
    }

    if (projectData.location) {
      const locationExists = await this.strapi.entityService.findOne(
        "api::location.location",
        projectData.location,
      );
      if (!locationExists) {
        throw new Error(`Invalid location ID: ${projectData.location}`);
      }
    }

    if (projectData.project_status) {
      const statusExists = await this.strapi.entityService.findOne(
        "api::project-status.project-status",
        projectData.project_status,
      );
      if (!statusExists) {
        throw new Error(
          `Invalid project_status ID: ${projectData.project_status}`,
        );
      }
    }
  }
}
