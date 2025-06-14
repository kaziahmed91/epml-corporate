import type { Schema, Struct } from '@strapi/strapi';

export interface CommonTextListItem extends Struct.ComponentSchema {
  collectionName: 'components_common_text_list_items';
  info: {
    description: 'Simple text item for creating lists';
    displayName: 'Text List Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface ProjectBulkPhotoUpload extends Struct.ComponentSchema {
  collectionName: 'components_project_bulk_photo_uploads';
  info: {
    description: 'Allows bulk upload of photos with batch category assignment and individual captions';
    displayName: 'Bulk Photo Upload';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      [
        'exterior',
        'interior',
        'construction_progress',
        'floor_plan',
        'amenities',
        'site_plan',
        'elevation',
        'lobby',
        'sample_unit',
        'parking',
        'common_areas',
        'landscaping',
        'brochure',
      ]
    > &
      Schema.Attribute.Required;
    defaultCaption: Schema.Attribute.String;
    photoMetadata: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    photos: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subcategory: Schema.Attribute.String;
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
    document: Schema.Attribute.Media<'files' | 'images'>;
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

export interface ProjectFloorAvailability extends Struct.ComponentSchema {
  collectionName: 'components_project_floor_availabilities';
  info: {
    description: 'Floor numbers where unit type is available';
    displayName: 'Floor Availability';
  };
  attributes: {
    floorNumber: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    isAvailable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    notes: Schema.Attribute.String;
    unitCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
  };
}

export interface ProjectPhotoItem extends Struct.ComponentSchema {
  collectionName: 'components_project_photo_items';
  info: {
    description: 'Categorized photo item for projects with Cloudinary folder organization';
    displayName: 'Photo Item';
  };
  attributes: {
    caption: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<
      [
        'exterior',
        'interior',
        'construction_progress',
        'floor_plan',
        'amenities',
        'site_plan',
        'elevation',
        'lobby',
        'sample_unit',
        'parking',
        'common_areas',
        'landscaping',
        'brochure',
      ]
    > &
      Schema.Attribute.Required;
    isHero: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    subcategory: Schema.Attribute.String;
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
    features: Schema.Attribute.Component<'common.text-list-item', true>;
    floorPlan: Schema.Attribute.Media<'images' | 'files'>;
    floors: Schema.Attribute.Component<'project.floor-availability', true>;
    hasLayoutPlan: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    images: Schema.Attribute.Component<'project.photo-item', true>;
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
    additionalFeatures: Schema.Attribute.Component<
      'common.text-list-item',
      true
    >;
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
    additionalFeatures: Schema.Attribute.Component<
      'common.text-list-item',
      true
    >;
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
      'common.text-list-item': CommonTextListItem;
      'location.coordinates': LocationCoordinates;
      'pricing.price-range': PricingPriceRange;
      'project.amenity-item': ProjectAmenityItem;
      'project.bulk-photo-upload': ProjectBulkPhotoUpload;
      'project.document-item': ProjectDocumentItem;
      'project.feature-item': ProjectFeatureItem;
      'project.floor-availability': ProjectFloorAvailability;
      'project.photo-item': ProjectPhotoItem;
      'project.unit-types': ProjectUnitTypes;
      'project.youtube-video': ProjectYoutubeVideo;
      'specifications.commercial': SpecificationsCommercial;
      'specifications.dimensions': SpecificationsDimensions;
      'specifications.residential': SpecificationsResidential;
    }
  }
}
