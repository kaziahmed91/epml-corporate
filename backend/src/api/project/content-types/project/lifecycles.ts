export default {
  async beforeCreate(event) {
    const { data } = event.params;
    await setProjectUploadContext(data, strapi);
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    
    // Get existing project to access slug
    const existingProject = await strapi.entityService.findOne('api::project.project', where.id, {
      fields: ['slug', 'name']
    });
    const projectData = { ...existingProject, ...data };
    await setProjectUploadContext(projectData, strapi);
  },

  async afterCreate(event) {
    const { result } = event;
    await processBulkUploads(result, strapi);
  },

  async afterUpdate(event) {
    const { result } = event;
    await processBulkUploads(result, strapi);
  },
};

async function setProjectUploadContext(projectData, strapi) {
  // Set global context for uploads within this project
  const projectSlug = projectData.slug || `project-${projectData.id || 'new'}`;
  
  // Store in strapi instance for upload provider to access
  if (!strapi.uploadContext) {
    strapi.uploadContext = {};
  }
  
  strapi.uploadContext.currentProject = {
    slug: projectSlug,
    folder: `projects/${projectSlug}`
  };
  
  strapi.log.info(`Set upload context for project: ${projectSlug}`);
}

async function processBulkUploads(project, strapi) {
  if (!project.bulkPhotoUploads || project.bulkPhotoUploads.length === 0) {
    return;
  }

  try {
    const photoBulkProcessor = strapi.service('api::project.photo-bulk-processor');
    const photoItems = await photoBulkProcessor.convertBulkUploadsToPhotoItems(
      project.id, 
      project.bulkPhotoUploads
    );

    // Add the converted photo items to the project's photos array
    if (photoItems.length > 0) {
      const existingPhotos = project.photos || [];
      const updatedPhotos = [...existingPhotos, ...photoItems.map(item => item.id)];
      
      await strapi.entityService.update('api::project.project', project.id, {
        data: {
          photos: updatedPhotos,
          // Clear bulk uploads after processing
          bulkPhotoUploads: []
        }
      });
      
      strapi.log.info(`Processed ${photoItems.length} bulk uploaded photos for project ${project.id}`);
    }
  } catch (error) {
    strapi.log.error('Error processing bulk photo uploads:', error);
  }
}