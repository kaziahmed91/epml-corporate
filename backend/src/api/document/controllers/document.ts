/**
 * document controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::document.document', ({ strapi }) => ({
  async create(ctx) {
    const { data, files } = ctx.request.body;
    
    // Support both traditional Strapi file upload and R2 data from Next.js frontend
    if (data.r2Key && data.r2Url) {
      // Document was uploaded via Next.js frontend to R2
      try {
        const entity = await strapi.entityService.create('api::document.document', {
          data: {
            ...data,
            uploadedAt: new Date(),
            publishedAt: new Date(),
          },
          populate: ['project'],
        });

        strapi.log.info(`Document created from R2 upload: ${entity.id}`);
        return this.transformResponse(entity);
        
      } catch (error) {
        strapi.log.error('Document creation from R2 data error:', error);
        return ctx.internalServerError(`Failed to create document: ${error.message}`);
      }
    }
    
    // Traditional Strapi file upload (fallback for admin panel)
    if (!files || !files.file) {
      return ctx.badRequest('No file provided or R2 data missing');
    }

    const fileData = files.file;
    
    // Validate file type
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/zip',
      'application/acad', // .dwg files
      'application/dxf', // .dxf files
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    if (!allowedMimeTypes.includes(fileData.type)) {
      return ctx.badRequest('File type not allowed. Please upload PDF, Word, Excel, PowerPoint, text, zip, CAD, or image files.');
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (fileData.size > maxSize) {
      return ctx.badRequest('File size too large. Maximum size is 100MB.');
    }

    try {
      // Create the document entry in database with standard Strapi file upload
      const entity = await strapi.entityService.create('api::document.document', {
        data: {
          ...data,
          file: fileData,
          uploadedAt: new Date(),
          publishedAt: new Date(),
        },
        populate: ['file', 'project'],
      });

      strapi.log.info(`Document created with Cloudinary upload: ${entity.id}`);
      return this.transformResponse(entity);
      
    } catch (error) {
      strapi.log.error('Document upload error:', error);
      return ctx.internalServerError(`Failed to upload document: ${error.message}`);
    }
  },

  async find(ctx) {
    const { query } = ctx;
    
    // Add project filter if provided
    if (query.project) {
      query.filters = query.filters || {};
      (query.filters as any).project = query.project;
    }

    const entities = await strapi.entityService.findMany('api::document.document', {
      ...query,
      populate: ['file', 'project'],
    });

    return this.transformResponse(entities);
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.entityService.findOne('api::document.document', id, {
      populate: ['file', 'project'],
    });

    return this.transformResponse(entity);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;

    try {
      const entity = await strapi.entityService.update('api::document.document', id, {
        data: data,
        populate: ['file', 'project'],
      });

      return this.transformResponse(entity);
    } catch (error) {
      strapi.log.error('Document update error:', error);
      return ctx.internalServerError(`Failed to update document: ${error.message}`);
    }
  },

  async delete(ctx) {
    const { id } = ctx.params;

    try {
      const entity = await strapi.entityService.delete('api::document.document', id, {
        populate: ['file', 'project'],
      });

      return this.transformResponse(entity);
    } catch (error) {
      strapi.log.error('Document delete error:', error);
      return ctx.internalServerError(`Failed to delete document: ${error.message}`);
    }
  },

  async findByProject(ctx) {
    const { projectId } = ctx.params;
    const { query } = ctx;
    
    if (!projectId) {
      return ctx.badRequest('Project ID is required');
    }

    try {
      // Validate that project exists
      const project = await strapi.entityService.findOne('api::project.project', projectId, {
        fields: ['id', 'name', 'slug'],
      });

      if (!project) {
        return ctx.notFound('Project not found');
      }

      const queryFilters = (query.filters && typeof query.filters === 'object') ? query.filters : {};
      
      const documents = await strapi.entityService.findMany('api::document.document', {
        ...query,
        filters: {
          ...queryFilters,
          project: projectId,
        },
        populate: ['file', 'project'],
        sort: { displayOrder: 'asc', createdAt: 'desc' },
      });

      return this.transformResponse(documents);
    } catch (error) {
      strapi.log.error('Find documents by project error:', error);
      return ctx.internalServerError(`Failed to find documents: ${error.message}`);
    }
  },

}));