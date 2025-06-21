export default {
  routes: [
    {
      method: 'POST',
      path: '/projects/:id/refresh-documents',
      handler: 'project.refreshDocuments',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};