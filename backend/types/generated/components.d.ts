import type { Schema, Attribute } from '@strapi/strapi';

export interface ProjectUnitTypes extends Schema.Component {
  collectionName: 'components_project_unit_types';
  info: {
    displayName: 'Unit Types';
    icon: 'search';
  };
  attributes: {
    name: Attribute.String;
    sold_out: Attribute.Boolean;
    images: Attribute.Media;
    units_available: Attribute.Integer;
    size: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'project.unit-types': ProjectUnitTypes;
    }
  }
}
