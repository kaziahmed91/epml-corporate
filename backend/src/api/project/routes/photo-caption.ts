export default {
  routes: [
    {
      method: 'PUT',
      path: '/projects/:id/photo-caption',
      handler: 'project.updatePhotoCaption',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/projects/:id/process-bulk-photos',
      handler: 'project.processBulkPhotos',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};