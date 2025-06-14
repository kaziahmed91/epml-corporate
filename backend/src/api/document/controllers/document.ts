/**
 * document controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::document.document', ({ strapi }) => ({
  async create(ctx) {
    const { data, files } = ctx.request.body;
    
    if (!files || !files.file) {
      return ctx.badRequest('No file provided');
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
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    if (!allowedMimeTypes.includes(fileData.type)) {
      return ctx.badRequest('File type not allowed. Please upload PDF, Word, Excel, PowerPoint, or image files.');
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (fileData.size > maxSize) {
      return ctx.badRequest('File size too large. Maximum size is 50MB.');
    }

    try {
      // Get project info for folder organization
      let projectInfo = null;
      if (data.project) {
        projectInfo = await strapi.entityService.findOne('api::project.project', data.project, {
          fields: ['id', 'name', 'slug'],
        });
      }

      // Create a project-specific filename prefix
      const projectPrefix = projectInfo 
        ? `${(projectInfo.slug || projectInfo.name || projectInfo.id).toString().trim().replace(/\s+/g, '-')}_`
        : '';
      
      // Modify the file name to include project info
      const originalName = fileData.name;
      const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
      const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
      fileData.name = `${projectPrefix}${baseName}${fileExtension}`;

      // Create the document entry
      const entity = await strapi.entityService.create('api::document.document', {
        data: {
          ...data,
          fileSize: fileData.size,
          mimeType: fileData.type,
          uploadedAt: new Date(),
        },
        files: {
          file: fileData,
        },
        populate: ['file', 'project'],
      });

      return this.transformResponse(entity);
    } catch (error) {
      console.error('Document upload error:', error);
      return ctx.internalServerError('Failed to upload document');
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
    const { data, files } = ctx.request.body;

    const updateData: any = { ...data };

    // If a new file is provided, validate it
    if (files && files.file) {
      const fileData = files.file;
      
      const allowedMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
      ];

      if (!allowedMimeTypes.includes(fileData.type)) {
        return ctx.badRequest('File type not allowed. Please upload PDF, Word, Excel, PowerPoint, or image files.');
      }

      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      if (fileData.size > maxSize) {
        return ctx.badRequest('File size too large. Maximum size is 50MB.');
      }

      updateData.fileSize = fileData.size;
      updateData.mimeType = fileData.type;
    }

    try {
      const entity = await strapi.entityService.update('api::document.document', id, {
        data: updateData,
        files: files ? { file: files.file } : undefined,
        populate: ['file', 'project'],
      });

      return this.transformResponse(entity);
    } catch (error) {
      return ctx.internalServerError('Failed to update document');
    }
  },
}));