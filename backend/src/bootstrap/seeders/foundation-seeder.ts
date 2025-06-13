// src/bootstrap/seeders/foundation-seeder.ts
import type { Core } from "@strapi/strapi";

type Strapi = Core.Strapi;
import { StrapiSeeder } from "../utils/seeder-helper";

interface FoundationMaps {
  locationMap: Record<string, number>;
  typeMap: Record<string, number>;
  statusMap: Record<string, number>;
}

export async function seedFoundationData(
  strapi: Strapi,
): Promise<FoundationMaps> {
  const seeder = new StrapiSeeder(strapi);

  console.log("🏗️  Seeding foundation data...");

  // 1. Seed Cities
  const chattogram = await seeder.findOrCreate(
    "api::city.city",
    { Name: "Chattogram" },
    { Name: "Chattogram" },
  );

  const dhaka = await seeder.findOrCreate(
    "api::city.city",
    { Name: "Dhaka" },
    { Name: "Dhaka" },
  );

  // 2. Seed Locations
  const locations = [
    { Name: "Agrabad Residential ", city: chattogram.id },
    { Name: "Agrabad Commercial ", city: chattogram.id },
    { Name: "Khulshi", city: chattogram.id },
    { Name: "Mehedibagh", city: chattogram.id },
    { Name: "Devpahar", city: chattogram.id },
  ];

  const locationMap: Record<string, number> = {};
  for (const locationData of locations) {
    const location = await seeder.findOrCreate(
      "api::location.location",
      { Name: locationData.Name },
      locationData,
    );
    locationMap[locationData.Name] = location.id;
  }

  // 3. Seed Project Types
  const projectTypes = ["Residential", "Commercial", "Mixed-Use"];
  const typeMap: Record<string, number> = {};

  for (const type of projectTypes) {
    const projectType = await seeder.findOrCreate(
      "api::project-type.project-type",
      { Type: type },
      { Type: type },
    );
    typeMap[type] = projectType.id;
  }

  // 4. Seed Project Statuses
  const statuses = ["Upcoming", "Ongoing", "Completed"];
  const statusMap: Record<string, number> = {};

  for (const status of statuses) {
    const projectStatus = await seeder.findOrCreate(
      "api::project-status.project-status",
      { Statuses: status },
      { Statuses: status },
    );
    statusMap[status] = projectStatus.id;
  }

  console.log("✅ Foundation data seeding completed");
  return { locationMap, typeMap, statusMap };
}
