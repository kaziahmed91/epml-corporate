/**
 * project controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::project.project', ({ strapi }) => ({
  async find(ctx) {
    // Populate photos with their media files
    ctx.query = {
      ...ctx.query,
      populate: {
        photos: {
          populate: ['photo']
        },
        residentialUnits: {
          populate: {
            images: {
              populate: ['photo']
            },
            layoutPlan: true,
            dimensions: true,
            specifications: {
              populate: ['additionalFeatures']
            },
            features: true
          }
        },
        commercialFloors: {
          populate: {
            floorplan: true,
            units: true
          }
        },
        projectDocuments: {
          populate: ['file']
        },
        youtubeVideos: true,
        project_type: true,
        location: {
          populate: ['city']
        },
        project_status: true,
        features: true,
        amenities: true,
        constructionUpdates: {
          populate: ['images', 'workCompleted', 'upcomingWork']
        }
      }
    };

    const response = await super.find(ctx);
    return response;
  },

  async findOne(ctx) {
    // Populate photos with their media files
    ctx.query = {
      ...ctx.query,
      populate: {
        photos: {
          populate: ['photo']
        },
        residentialUnits: {
          populate: {
            images: {
              populate: ['photo']
            },
            layoutPlan: true,
            dimensions: true,
            specifications: {
              populate: ['additionalFeatures']
            },
            features: true
          }
        },
        commercialFloors: {
          populate: {
            floorplan: true,
            units: true
          }
        },
        projectDocuments: {
          populate: ['file']
        },
        youtubeVideos: true,
        project_type: true,
        location: {
          populate: ['city']
        },
        project_status: true,
        features: true,
        amenities: true,
        constructionUpdates: {
          populate: ['images', 'workCompleted', 'upcomingWork']
        }
      }
    };

    const response = await super.findOne(ctx);
    return response;
  },

  async create(ctx) {
    // Call the default create controller
    const response = await super.create(ctx);
    
    // After creating the project, log folder organization info
    if (response.data && response.data.id) {
      const projectSlug = response.data.attributes?.slug || `project-${response.data.id}`;
      strapi.log.info(`Project ${projectSlug} photos should be organized in folder: projects/${projectSlug}`);
    }
    
    return response;
  },

  async update(ctx) {
    // Call the default update controller
    const response = await super.update(ctx);
    
    // After updating the project, log folder organization info
    if (response.data && response.data.id) {
      const projectSlug = response.data.attributes?.slug || `project-${response.data.id}`;
      strapi.log.info(`Project ${projectSlug} photos should be organized in folder: projects/${projectSlug}`);
    }
    
    return response;
  },

  async updatePhotoCaption(ctx) {
    const { id } = ctx.params;
    const { photoItemId, caption, subcategory, sortOrder, isHero } = ctx.request.body;

    try {
      // Verify the photo item belongs to this project
      const project: any = await strapi.entityService.findOne('api::project.project', id, {
        populate: ['photos']
      });

      if (!project) {
        return ctx.notFound('Project not found');
      }

      const photoExists = project.photos && project.photos.some((photo: any) => photo.id === photoItemId);
      if (!photoExists) {
        return ctx.badRequest('Photo item does not belong to this project');
      }

      // Update the photo item directly in the database
      const updatedPhotoItem = await strapi.db.query('project.photo-item').update({
        where: { id: photoItemId },
        data: {
          caption,
          subcategory,
          sortOrder,
          isHero
        }
      });

      return ctx.send({
        data: updatedPhotoItem
      });

    } catch (error) {
      strapi.log.error('Error updating photo caption:', error);
      return ctx.internalServerError('Failed to update photo caption');
    }
  },

  async processBulkPhotos(ctx) {
    const { id } = ctx.params;

    try {
      // Get project with bulk uploads
      const project: any = await strapi.entityService.findOne('api::project.project', id, {
        populate: {
          bulkPhotoUploads: {
            populate: ['photos']
          },
          photos: true
        }
      });

      if (!project) {
        return ctx.notFound('Project not found');
      }

      if (!project.bulkPhotoUploads || project.bulkPhotoUploads.length === 0) {
        return ctx.badRequest('No bulk photo uploads found');
      }

      strapi.log.info(`Processing ${project.bulkPhotoUploads.length} bulk uploads for project ${id}`);

      // Process each bulk upload
      const allPhotoItems = [];
      for (const bulkUpload of project.bulkPhotoUploads) {
        const { photos, category, subcategory, defaultCaption, photoMetadata = [], sortOrder = 0 } = bulkUpload;
        
        if (!photos || !Array.isArray(photos)) {
          continue;
        }

        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const metadata = photoMetadata[i] || {};
          
          // Create individual photo item
          const photoItem = await strapi.db.query('project.photo-item').create({
            data: {
              photo: photo.id || photo,
              category,
              subcategory: metadata.subcategory || subcategory,
              caption: metadata.caption || defaultCaption || '',
              sortOrder: (metadata.sortOrder !== undefined) ? metadata.sortOrder : (sortOrder + i),
              isHero: metadata.isHero || false
            }
          });
          
          allPhotoItems.push(photoItem);
          strapi.log.info(`Created photo item: ${photoItem.id} with category: ${category}`);
        }
      }

      // Update project with new photo items and clear bulk uploads
      if (allPhotoItems.length > 0) {
        const existingPhotos = project.photos || [];
        const existingPhotoIds = existingPhotos.map(p => p.id || p);
        const newPhotoIds = allPhotoItems.map(item => item.id);
        const updatedPhotoIds = [...existingPhotoIds, ...newPhotoIds];
        
        await strapi.entityService.update('api::project.project', id, {
          data: {
            photos: updatedPhotoIds,
            bulkPhotoUploads: []
          }
        });

        strapi.log.info(`Processed ${allPhotoItems.length} bulk uploaded photos for project ${id}`);
      }

      return ctx.send({
        message: `Successfully processed ${allPhotoItems.length} photos`,
        photoItems: allPhotoItems
      });

    } catch (error) {
      strapi.log.error('Error processing bulk photos:', error);
      return ctx.internalServerError('Failed to process bulk photos');
    }
  },

  async refreshDocuments(ctx) {
    const { id } = ctx.params;
    
    try {
      // Force refresh the project with its documents
      const project = await strapi.entityService.findOne('api::project.project', id, {
        populate: {
          projectDocuments: {
            populate: ['file']
          }
        }
      });
      
      if (!project) {
        return ctx.notFound('Project not found');
      }
      
      // Force a cache refresh by updating the project's updatedAt timestamp
      await strapi.entityService.update('api::project.project', id, {
        data: {
          updatedAt: new Date()
        }
      });
      
      strapi.log.info(`Admin cache refreshed for project ${id} documents`);
      
      return ctx.send({
        message: 'Documents cache refreshed successfully',
        documentCount: (project as any).projectDocuments?.length || 0
      });
      
    } catch (error) {
      strapi.log.error('Error refreshing documents cache:', error);
      return ctx.internalServerError('Failed to refresh documents cache');
    }
  },

}));