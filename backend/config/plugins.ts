export default ({ env }) => ({
  // Cloudinary for images only (default Strapi upload provider)
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: 'project-images',
          resource_type: 'image', // Only images to Cloudinary
          use_filename: true,
          unique_filename: true,
        },
        uploadStream: {
          folder: 'project-images',
          resource_type: 'image', // Only images to Cloudinary
          use_filename: true,
          unique_filename: true,
        },
      },
      sizeLimit: 10 * 1024 * 1024, // 10MB for images (within free plan)
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      },
    },
  },
});
