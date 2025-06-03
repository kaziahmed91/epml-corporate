# Strapi Content Type Schemas

This document outlines the content types that need to be created in the Strapi backend to support the frontend requirements.

## Project

```json
{
  "kind": "collectionType",
  "collectionName": "projects",
  "info": {
    "singularName": "project",
    "pluralName": "projects",
    "displayName": "Project",
    "description": "Real estate development projects"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true
    },
    "longDescription": {
      "type": "richtext"
    },
    "location": {
      "type": "string",
      "required": true
    },
    "city": {
      "type": "string",
      "required": true
    },
    "projectType": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::project-type.project-type",
      "inversedBy": "projects"
    },
    "status": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::project-status.project-status",
      "inversedBy": "projects"
    },
    "startDate": {
      "type": "date"
    },
    "completionDate": {
      "type": "date"
    },
    "totalUnits": {
      "type": "integer"
    },
    "architect": {
      "type": "string"
    },
    "developer": {
      "type": "string",
      "default": "EPML Properties"
    },
    "features": {
      "type": "component",
      "repeatable": true,
      "component": "project.feature"
    },
    "amenities": {
      "type": "component",
      "repeatable": true,
      "component": "project.amenity"
    },
    "mainImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "galleryImages": {
      "type": "media",
      "multiple": true,
      "allowedTypes": ["images"]
    },
    "constructionProgress": {
      "type": "integer",
      "min": 0,
      "max": 100,
      "default": 0
    },
    "nearbyAttractions": {
      "type": "component",
      "repeatable": true,
      "component": "project.nearby-attraction"
    },
    "contactEmail": {
      "type": "email"
    },
    "contactPhone": {
      "type": "string"
    },
    "unitTypes": {
      "type": "component",
      "repeatable": true,
      "component": "project.unit-types"
    },
    "latitude": {
      "type": "float"
    },
    "longitude": {
      "type": "float"
    }
  }
}
```

## Project Status

```json
{
  "kind": "collectionType",
  "collectionName": "project_statuses",
  "info": {
    "singularName": "project-status",
    "pluralName": "project-statuses",
    "displayName": "Project Status"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "projects": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::project.project",
      "mappedBy": "status"
    }
  }
}
```

## Project Type

```json
{
  "kind": "collectionType",
  "collectionName": "project_types",
  "info": {
    "singularName": "project-type",
    "pluralName": "project-types",
    "displayName": "Project Type"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "projects": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::project.project",
      "mappedBy": "projectType"
    }
  }
}
```

## Recent News

```json
{
  "kind": "collectionType",
  "collectionName": "recent_news",
  "info": {
    "singularName": "recent-news",
    "pluralName": "recent-news",
    "displayName": "Recent News",
    "description": "News and articles about projects and the company"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "date": {
      "type": "date",
      "required": true
    },
    "author": {
      "type": "string",
      "required": true
    },
    "category": {
      "type": "string",
      "required": true
    },
    "excerpt": {
      "type": "text",
      "required": true
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "tags": {
      "type": "component",
      "repeatable": true,
      "component": "shared.tag"
    },
    "relatedProjects": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::project.project"
    }
  }
}
```

## Career

```json
{
  "kind": "collectionType",
  "collectionName": "careers",
  "info": {
    "singularName": "career",
    "pluralName": "careers",
    "displayName": "Career",
    "description": "Job listings and career opportunities"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "department": {
      "type": "string",
      "required": true
    },
    "location": {
      "type": "string",
      "required": true
    },
    "type": {
      "type": "string",
      "required": true
    },
    "posted": {
      "type": "date",
      "required": true
    },
    "description": {
      "type": "text",
      "required": true
    },
    "responsibilities": {
      "type": "component",
      "repeatable": true,
      "component": "career.responsibility"
    },
    "requirements": {
      "type": "component",
      "repeatable": true,
      "component": "career.requirement"
    },
    "benefits": {
      "type": "component",
      "repeatable": true,
      "component": "career.benefit"
    }
  }
}
```

## Contact Submission

```json
{
  "kind": "collectionType",
  "collectionName": "contact_submissions",
  "info": {
    "singularName": "contact-submission",
    "pluralName": "contact-submissions",
    "displayName": "Contact Submission"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email",
      "required": true
    },
    "phone": {
      "type": "string"
    },
    "inquiry": {
      "type": "enumeration",
      "enum": [
        "property",
        "sales",
        "landowner",
        "general",
        "support",
        "careers",
        "other"
      ],
      "required": true
    },
    "message": {
      "type": "text",
      "required": true
    },
    "privacyConsent": {
      "type": "boolean",
      "required": true,
      "default": false
    }
  }
}
```

## Components

### Project Components

#### Unit Types (project.unit-types)

```json
{
  "info": {
    "displayName": "Unit Types"
  },
  "attributes": {
    "type": {
      "type": "string",
      "required": true
    },
    "size": {
      "type": "string",
      "required": true
    },
    "priceRange": {
      "type": "string",
      "required": true
    },
    "available": {
      "type": "integer",
      "required": true,
      "min": 0
    }
  }
}
```

#### Feature (project.feature)

```json
{
  "info": {
    "displayName": "Feature"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    }
  }
}
```

#### Amenity (project.amenity)

```json
{
  "info": {
    "displayName": "Amenity"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    }
  }
}
```

#### Nearby Attraction (project.nearby-attraction)

```json
{
  "info": {
    "displayName": "Nearby Attraction"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "distance": {
      "type": "string"
    }
  }
}
```

### Career Components

#### Responsibility (career.responsibility)

```json
{
  "info": {
    "displayName": "Responsibility"
  },
  "attributes": {
    "description": {
      "type": "string",
      "required": true
    }
  }
}
```

#### Requirement (career.requirement)

```json
{
  "info": {
    "displayName": "Requirement"
  },
  "attributes": {
    "description": {
      "type": "string",
      "required": true
    }
  }
}
```

#### Benefit (career.benefit)

```json
{
  "info": {
    "displayName": "Benefit"
  },
  "attributes": {
    "description": {
      "type": "string",
      "required": true
    }
  }
}
```

### Shared Components

#### Tag (shared.tag)

```json
{
  "info": {
    "displayName": "Tag"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    }
  }
}
```