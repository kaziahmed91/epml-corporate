export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://res.cloudinary.com",
            "*.cloudinary.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://res.cloudinary.com",
            "*.cloudinary.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      patchKoa: true,
      multipart: true,
      includeUnparsed: true,
      formLimit: "100mb",
      jsonLimit: "100mb",
      textLimit: "100mb",
      formidable: {
        maxFileSize: 100 * 1024 * 1024, // 100MB
        maxFields: 1000,
        maxFieldsSize: 100 * 1024 * 1024, // 100MB
        keepExtensions: true,
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];