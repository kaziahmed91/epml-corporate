// src/bootstrap/migrations/seed-migration-tracker.ts
import type { Core } from '@strapi/strapi';

type Strapi = Core.Strapi;

interface SeedMigration {
  id: string;
  name: string;
  environment: string;
  executed_at: Date;
  metadata: {
    tables: string[];
    description: string;
    entityCount: number;
  };
}

export class SeedMigrationTracker {
  private strapi: Strapi;

  constructor(strapi: Strapi) {
    this.strapi = strapi;
  }

  async initializeMigrationTable(): Promise<void> {
    // Check if we need to create our custom migration tracking
    try {
      await this.strapi.db.connection.schema.createTableIfNotExists('seed_migrations', (table) => {
        table.string('id').primary();
        table.string('name');
        table.string('environment');
        table.timestamp('executed_at').defaultTo(this.strapi.db.connection.fn.now());
        table.json('metadata');
        table.timestamps();
      });
      
      console.log('✅ Seed migration tracking table initialized');
    } catch (error) {
      console.error('❌ Failed to initialize migration table:', error);
    }
  }

  async recordMigration(migrationData: Omit<SeedMigration, 'executed_at'>): Promise<void> {
    await this.strapi.db.connection('seed_migrations').insert({
      ...migrationData,
      executed_at: new Date(),
      metadata: JSON.stringify(migrationData.metadata)
    });
    
    console.log(`📝 Recorded migration: ${migrationData.id}`);
  }

  async isMigrationExecuted(migrationId: string): Promise<boolean> {
    const result = await this.strapi.db.connection('seed_migrations')
      .where({ id: migrationId, environment: process.env.NODE_ENV })
      .first();
    
    return !!result;
  }

  async removeMigration(migrationId: string): Promise<void> {
    await this.strapi.db.connection('seed_migrations')
      .where({ id: migrationId })
      .del();
    
    console.log(`🗑️  Removed migration record: ${migrationId}`);
  }

  async getAllMigrations(): Promise<SeedMigration[]> {
    const migrations = await this.strapi.db.connection('seed_migrations')
      .where({ environment: process.env.NODE_ENV })
      .orderBy('executed_at', 'desc');
    
    return migrations.map(migration => ({
      ...migration,
      metadata: typeof migration.metadata === 'string' 
        ? JSON.parse(migration.metadata) 
        : migration.metadata
    }));
  }
}
