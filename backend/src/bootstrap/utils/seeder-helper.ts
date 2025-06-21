// src/bootstrap/utils/seeder-helper.ts
import type { Core } from '@strapi/strapi';

type Strapi = Core.Strapi;

export class StrapiSeeder {
  private strapi: Strapi;

  constructor(strapi: Strapi) {
    this.strapi = strapi;
  }

  async createEntry<T = any>(uid: string, data: Record<string, any>): Promise<T> {
    try {
      const entry = await this.strapi.entityService.create(uid as any, {
        data: {
          ...data,
          publishedAt: new Date().toISOString(),
        },
      }) as T;
      
      console.log(`✅ Created ${uid}: ${(entry as any).id}`);
      return entry;
    } catch (error: any) {
      console.error(`❌ Failed to create ${uid}:`, error.message);
      throw error;
    }
  }

  async findOrCreate<T = any>(
    uid: string, 
    searchCriteria: Record<string, any>, 
    createData: Record<string, any>
  ): Promise<T> {
    const existing = await this.strapi.entityService.findMany(uid as any, {
      filters: searchCriteria,
      limit: 1
    }) as T[];

    if (existing.length > 0) {
      console.log(`ℹ️  Found existing ${uid}: ${(existing[0] as any).id}`);
      
      // For projects, update the existing entry with new data
      if (uid === 'api::project.project') {
        console.log(`🔄 Updating existing project: ${(existing[0] as any).name}`);
        const updated = await this.strapi.entityService.update(uid as any, (existing[0] as any).id, {
          data: {
            ...createData,
            publishedAt: new Date().toISOString(),
          },
        }) as T;
        console.log(`✅ Updated ${uid}: ${(updated as any).id}`);
        return updated;
      }
      
      return existing[0];
    }

    return await this.createEntry<T>(uid, createData);
  }

  async createWithComponents<T = any>(uid: string, data: Record<string, any>): Promise<T> {
    const processedData = await this.processComponents(data);
    
    // For projects, use findOrCreate to handle existing slugs
    if (uid === 'api::project.project' && processedData.slug) {
      return await this.findOrCreate<T>(uid, { slug: processedData.slug }, processedData);
    }
    
    return await this.createEntry<T>(uid, processedData);
  }

  private async processComponents(data: Record<string, any>): Promise<Record<string, any>> {
    const processed = { ...data };

    if (processed.features) {
      processed.features = processed.features.map((feature: any) => ({
        __component: 'project.feature-item',
        ...feature
      }));
    }

    if (processed.amenities) {
      processed.amenities = processed.amenities.map((amenity: any) => ({
        __component: 'project.amenity-item',
        ...amenity
      }));
    }

    if (processed.Unit) {
      processed.Unit = processed.Unit.map((unit: any) => ({
        __component: 'project.unit-types',
        ...unit,
        dimensions: unit.dimensions ? {
          __component: 'specifications.dimensions',
          ...unit.dimensions
        } : null,
        residentialSpecs: unit.residentialSpecs ? {
          __component: 'specifications.residential',
          ...unit.residentialSpecs
        } : null,
        commercialSpecs: unit.commercialSpecs ? {
          __component: 'specifications.commercial',
          ...unit.commercialSpecs
        } : null
      }));
    }

    if (processed.projectDocuments) {
      processed.projectDocuments = processed.projectDocuments.map((doc: any) => ({
        __component: 'project.document-item',
        ...doc
      }));
    }

    if (processed.youtubeVideos) {
      processed.youtubeVideos = processed.youtubeVideos.map((video: any) => ({
        __component: 'project.youtube-video',
        ...video
      }));
    }

    return processed;
  }

  async validateRequiredFields(data: Record<string, any>, requiredFields: string[]): Promise<void> {
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }

  async removeAllEntitiesOfType(entityType: string): Promise<number> {
    const entities = await this.strapi.entityService.findMany(entityType as any);
    const entitiesArray = Array.isArray(entities) ? entities : [entities];
    let count = 0;
    
    for (const entity of entitiesArray) {
      await this.strapi.entityService.delete(entityType as any, entity.id);
      count++;
    }
    
    console.log(`🗑️  Removed ${count} entities of type ${entityType}`);
    return count;
  }
}
