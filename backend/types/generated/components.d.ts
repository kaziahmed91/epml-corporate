import type { Schema, Struct } from '@strapi/strapi';

export interface LocationCoordinates extends Struct.ComponentSchema {
  collectionName: 'components_location_coordinates';
  info: {
    description: 'GPS coordinates for map integration';
    displayName: 'Coordinates';
  };
  attributes: {
    latitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
    longitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface PricingPriceRange extends Struct.ComponentSchema {
  collectionName: 'components_pricing_price_ranges';
  info: {
    description: 'Price range for projects';
    displayName: 'Price Range';
  };
  attributes: {
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'BDT'>;
    maxPrice: Schema.Attribute.BigInteger;
    minPrice: Schema.Attribute.BigInteger;
  };
}

export interface ProjectAmenityItem extends Struct.ComponentSchema {
  collectionName: 'components_project_amenities';
  info: {
    displayName: 'Amenity Item';
    icon: 'star';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'recreation',
        'wellness',
        'community',
        'parking',
        'services',
        'outdoor',
        'security',
        'utilities',
      ]
    >;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectDocumentItem extends Struct.ComponentSchema {
  collectionName: 'components_project_document_items';
  info: {
    description: 'Individual project documents with display names';
    displayName: 'Document Item';
    icon: 'file-text';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'Floor Plans',
        'Architectural Drawings',
        'Approvals',
        'Legal Documents',
        'Specifications',
        'Other',
      ]
    >;
    description: Schema.Attribute.Text;
    displayName: Schema.Attribute.String & Schema.Attribute.Required;
    displayOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    document: Schema.Attribute.Media<'files' | 'images'> &
      Schema.Attribute.Required;
  };
}

export interface ProjectFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_project_feature_list';
  info: {
    description: 'Individual feature with icon and translations';
    displayName: 'Feature Item';
    icon: 'check-circle';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['security', 'convenience', 'utilities', 'accessibility', 'technology']
    >;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface ProjectUnitTypes extends Struct.ComponentSchema {
  collectionName: 'components_project_unit_types';
  info: {
    description: 'Comprehensive unit specifications for residential and commercial properties';
    displayName: 'Unit Types';
  };
  attributes: {
    commercialSpecs: Schema.Attribute.Component<
      'specifications.commercial',
      false
    >;
    description: Schema.Attribute.Text;
    dimensions: Schema.Attribute.Component<'specifications.dimensions', false>;
    facing: Schema.Attribute.Enumeration<
      [
        'North',
        'South',
        'East',
        'West',
        'North-East',
        'North-West',
        'South-East',
        'South-West',
      ]
    >;
    features: Schema.Attribute.JSON;
    floorPlan: Schema.Attribute.Media<'images' | 'files'>;
    floors: Schema.Attribute.JSON;
    hasLayoutPlan: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    images: Schema.Attribute.Media<'images', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    residentialSpecs: Schema.Attribute.Component<
      'specifications.residential',
      false
    >;
    type: Schema.Attribute.Enumeration<
      [
        'studio',
        '1bed',
        '2bed',
        '3bed',
        '4bed',
        'penthouse',
        'duplex',
        'shop',
        'showroom',
        'atm',
        'food_court',
        'bank',
        'office',
        'warehouse',
      ]
    >;
    unitCategory: Schema.Attribute.Enumeration<
      ['residential', 'commercial', 'parking', 'utility']
    > &
      Schema.Attribute.Required;
  };
}

export interface ProjectYoutubeVideo extends Struct.ComponentSchema {
  collectionName: 'components_project_youtube_videos';
  info: {
    description: 'YouTube video links for projects';
    displayName: 'YouTube Video';
    icon: 'play-circle';
  };
  attributes: {
    description: Schema.Attribute.Text;
    displayOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    youtubeUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SpecificationsCommercial extends Struct.ComponentSchema {
  collectionName: 'components_specifications_commercial';
  info: {
    description: 'Specifications specific to commercial units';
    displayName: 'Commercial Specifications';
  };
  attributes: {
    additionalFeatures: Schema.Attribute.JSON;
    airConditioning: Schema.Attribute.Enumeration<
      ['Central', 'Split', 'Window', 'None', 'Provision']
    >;
    basement: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    commercialType: Schema.Attribute.Enumeration<
      [
        'ATM',
        'Food Court',
        'Small Shop',
        'Large Shop',
        'Showroom',
        'Bank',
        'Office',
        'Warehouse',
        'Restaurant',
        'Clinic',
        'Salon',
        'Pharmacy',
        'Other',
      ]
    >;
    frontage: Schema.Attribute.Decimal;
    loadingDock: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    mezzanine: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    powerLoad: Schema.Attribute.String;
    storageArea: Schema.Attribute.Decimal;
    washrooms: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface SpecificationsDimensions extends Struct.ComponentSchema {
  collectionName: 'components_specifications_dimensions';
  info: {
    description: 'Physical dimensions of units';
    displayName: 'Dimensions';
  };
  attributes: {
    balconyArea: Schema.Attribute.Decimal;
    carpetArea: Schema.Attribute.Decimal;
    height: Schema.Attribute.Decimal;
    length: Schema.Attribute.Decimal;
    totalArea: Schema.Attribute.Decimal;
    width: Schema.Attribute.Decimal;
  };
}

export interface SpecificationsResidential extends Struct.ComponentSchema {
  collectionName: 'components_specifications_residential';
  info: {
    description: 'Specifications specific to residential units';
    displayName: 'Residential Specifications';
  };
  attributes: {
    additionalFeatures: Schema.Attribute.JSON;
    balconies: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    bathrooms: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    bedrooms: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    diningRooms: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    kitchens: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    livingRooms: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    parkingSpaces: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    servantRooms: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    storeRooms: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    studyRooms: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'location.coordinates': LocationCoordinates;
      'pricing.price-range': PricingPriceRange;
      'project.amenity-item': ProjectAmenityItem;
      'project.document-item': ProjectDocumentItem;
      'project.feature-item': ProjectFeatureItem;
      'project.unit-types': ProjectUnitTypes;
      'project.youtube-video': ProjectYoutubeVideo;
      'specifications.commercial': SpecificationsCommercial;
      'specifications.dimensions': SpecificationsDimensions;
      'specifications.residential': SpecificationsResidential;
    }
  }
}
