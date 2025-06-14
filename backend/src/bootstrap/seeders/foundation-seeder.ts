// src/bootstrap/seeders/foundation-seeder.ts
import type { Core } from "@strapi/strapi";

type Strapi = Core.Strapi;
import { StrapiSeeder } from "../utils/seeder-helper";

// data
import cities from "./data/base-data/cities.json";
import locations from "./data/base-data/locations.json";
import projectTypes from "./data/base-data/project-types.json";
import projectStatuses from "./data/base-data/project-statuses.json";

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
  const cityMap: Record<string, number> = {};
  for (const cityData of cities) {
    const city = await seeder.findOrCreate(
      "api::city.city",
      { Name: cityData.Name },
      cityData,
    );
    cityMap[cityData.Name] = city.id;
  }

  // 2. Seed Locations
  const locationMap: Record<string, number> = {};
  for (const locationData of locations) {
    const cityId = cityMap[locationData.cityName];
    if (!cityId) {
      console.warn(`City not found for location: ${locationData.Name}`);
      continue;
    }

    const location = await seeder.findOrCreate(
      "api::location.location",
      { Name: locationData.Name },
      { ...locationData, city: cityId },
    );
    locationMap[locationData.Name] = location.id;
  }

  // 3. Seed Project Types
  const typeMap: Record<string, number> = {};
  for (const typeData of projectTypes) {
    const projectType = await seeder.findOrCreate(
      "api::project-type.project-type",
      { Type: typeData.Type },
      typeData,
    );
    typeMap[typeData.Type] = projectType.id;
  }

  // 4. Seed Project Statuses
  const statusMap: Record<string, number> = {};
  for (const statusData of projectStatuses) {
    const projectStatus = await seeder.findOrCreate(
      "api::project-status.project-status",
      { Statuses: statusData.Statuses },
      statusData,
    );
    statusMap[statusData.Statuses] = projectStatus.id;
  }

  console.log("✅ Foundation data seeding completed");
  return { locationMap, typeMap, statusMap };
}
