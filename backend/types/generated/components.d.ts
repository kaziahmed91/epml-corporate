import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectUnitTypes extends Struct.ComponentSchema {
  collectionName: 'components_project_unit_types';
  info: {
    displayName: 'Unit Types';
    icon: 'search';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
    size: Schema.Attribute.Integer;
    sold_out: Schema.Attribute.Boolean;
    units_available: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.unit-types': ProjectUnitTypes;
    }
  }
}
