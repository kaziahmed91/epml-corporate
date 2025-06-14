// src/bootstrap/seeders/template-seeder.ts
import type { Core } from '@strapi/strapi';

type Strapi = Core.Strapi;
import { StrapiSeeder } from '../utils/seeder-helper';

export async function seedTemplateData(strapi: Strapi): Promise<void> {
  const seeder = new StrapiSeeder(strapi);
  
  console.log('📋 Seeding template data...');

  // Feature Templates
  const features = [
    {
      name: "CCTV Security System",
      icon: "shield",
      category: "security",
      isActive: true,
      displayOrder: 1,
      locale: "en"
    },
    {
      name: "Emergency Power Backup",
      icon: "zap",
      category: "utilities",
      isActive: true,
      displayOrder: 2,
      locale: "en"
    },
    {
      name: "Fire Safety System",
      icon: "shield-check",
      category: "security",
      isActive: true,
      displayOrder: 3,
      locale: "en"
    },
    {
      name: "Intercom System",
      icon: "phone",
      category: "technology",
      isActive: true,
      displayOrder: 4,
      locale: "en"
    },
    {
      name: "High-Speed Elevators",
      icon: "arrow-up",
      category: "convenience",
      isActive: true,
      displayOrder: 5,
      locale: "en"
    },
    {
      name: "Water Supply System",
      icon: "droplet",
      category: "utilities",
      isActive: true,
      displayOrder: 6,
      locale: "en"
    },
    {
      name: "Broadband Ready",
      icon: "wifi",
      category: "technology",
      isActive: true,
      displayOrder: 7,
      locale: "en"
    }
  ];

  for (const feature of features) {
    await seeder.findOrCreate('api::feature-template.feature-template',
      { name: feature.name },
      feature
    );
  }

  // Amenity Templates
  const amenities = [
    {
      name: "Swimming Pool",
      icon: "waves",
      category: "recreation",
      isActive: true,
      displayOrder: 1,
      locale: "en"
    },
    {
      name: "Gymnasium",
      icon: "dumbbell",
      category: "wellness",
      isActive: true,
      displayOrder: 2,
      locale: "en"
    },
    {
      name: "Children's Play Area",
      icon: "baby",
      category: "outdoor",
      isActive: true,
      displayOrder: 3,
      locale: "en"
    },
    {
      name: "Barbecue Area",
      icon: "grill",
      category: "outdoor",
      isActive: true,
      displayOrder: 4,
      locale: "en"
    },
    {
      name: "Gaming Lounge",
      icon: "gamepad-2",
      category: "recreation",
      isActive: true,
      displayOrder: 5,
      locale: "en"
    },
    {
      name: "Rooftop Garden",
      icon: "trees",
      category: "outdoor",
      isActive: true,
      displayOrder: 6,
      locale: "en"
    },
    {
      name: "Community Hall",
      icon: "users",
      category: "community",
      isActive: true,
      displayOrder: 7,
      locale: "en"
    },
    {
      name: "Parking Garage",
      icon: "car",
      category: "parking",
      isActive: true,
      displayOrder: 8,
      locale: "en"
    },
    {
      name: "Security Service",
      icon: "shield-check",
      category: "services",
      isActive: true,
      displayOrder: 9,
      locale: "en"
    }
  ];

  for (const amenity of amenities) {
    await seeder.findOrCreate('api::amenity-template.amenity-template',
      { name: amenity.name },
      amenity
    );
  }

  console.log('✅ Template data seeding completed');
}
