/**
 * Photo Bulk Processor Service
 * Handles conversion of bulk photo uploads to individual photo items
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::project.project', ({ strapi }) => ({
  
  /**
   * Process bulk photo upload component and convert to individual photo items
   */
  async processBulkPhotoUpload(bulkUpload: any): Promise<any[]> {
    const { photos, category, subcategory, defaultCaption, photoMetadata = [], sortOrder = 0 } = bulkUpload;
    
    if (!photos || !Array.isArray(photos)) {
      return [];
    }

    const photoItems = [];
    
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
      
      photoItems.push(photoItem);
      
      strapi.log.info(`Created photo item: ${photoItem.id} with category: ${category}`);
    }
    
    return photoItems;
  },

  /**
   * Convert bulk uploads to individual photo items for a project
   */
  async convertBulkUploadsToPhotoItems(projectId: number, bulkUploads: any[]): Promise<any[]> {
    if (!bulkUploads || bulkUploads.length === 0) {
      return [];
    }

    const allPhotoItems = [];
    
    for (const bulkUpload of bulkUploads) {
      const photoItems = await this.processBulkPhotoUpload(bulkUpload);
      allPhotoItems.push(...photoItems);
    }
    
    strapi.log.info(`Converted ${bulkUploads.length} bulk uploads to ${allPhotoItems.length} individual photo items for project ${projectId}`);
    
    return allPhotoItems;
  },

  /**
   * Update photo metadata for bulk uploaded photos
   */
  async updatePhotoMetadata(photoItemId: number, metadata: any): Promise<any> {
    return await strapi.db.query('project.photo-item').update({
      where: { id: photoItemId },
      data: {
        caption: metadata.caption,
        subcategory: metadata.subcategory,
        sortOrder: metadata.sortOrder,
        isHero: metadata.isHero
      }
    });
  }

}));