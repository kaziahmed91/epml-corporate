/**
 * document service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::document.document', ({ strapi }) => ({
  async findByProject(projectId: string | number) {
    return await strapi.entityService.findMany('api::document.document', {
      filters: {
        project: {
          id: projectId,
        },
      },
      populate: ['file', 'project'],
      sort: ['displayOrder:asc', 'uploadedAt:desc'],
    });
  },

  async findByCategory(category: string, projectId?: string | number) {
    const filters: any = {
      category,
    };

    if (projectId) {
      filters.project = {
        id: projectId,
      };
    }

    return await strapi.entityService.findMany('api::document.document', {
      filters,
      populate: ['file', 'project'],
      sort: ['displayOrder:asc', 'uploadedAt:desc'],
    });
  },

  async findPublicDocuments(projectId?: string | number) {
    const filters: any = {
      isPublic: true,
    };

    if (projectId) {
      filters.project = {
        id: projectId,
      };
    }

    return await strapi.entityService.findMany('api::document.document', {
      filters,
      populate: ['file', 'project'],
      sort: ['displayOrder:asc', 'uploadedAt:desc'],
    });
  },
}));