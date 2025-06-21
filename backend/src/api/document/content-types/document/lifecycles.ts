export default {
  async afterCreate(event) {
    const { result } = event;
    
    // If the document has a project relationship, log it for admin interface awareness
    if (result.project) {
      strapi.log.info(`Document ${result.id} linked to project ${result.project} - admin interface should refresh`);
      
      // Force admin interface to be aware of the relationship by triggering a project update
      try {
        await strapi.entityService.update('api::project.project', result.project, {
          data: {
            // Trigger a minimal update to refresh admin cache
            updatedAt: new Date()
          }
        });
        strapi.log.info(`Project ${result.project} updated to refresh admin interface cache`);
      } catch (error) {
        strapi.log.warn(`Could not refresh project cache: ${error.message}`);
      }
    }
  },

  async afterUpdate(event) {
    const { result } = event;
    
    // If project relationship was modified, refresh cache
    if (result.project) {
      strapi.log.info(`Document ${result.id} relationship updated - refreshing admin cache`);
      
      try {
        await strapi.entityService.update('api::project.project', result.project, {
          data: {
            updatedAt: new Date()
          }
        });
      } catch (error) {
        strapi.log.warn(`Could not refresh project cache: ${error.message}`);
      }
    }
  }
};