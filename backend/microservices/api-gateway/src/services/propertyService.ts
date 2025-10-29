import { getDatabase } from '@ivorian-realty/shared-lib';
import { AppError } from '../middleware/errorHandler';

export interface Property {
  _id?: string;
  title: string;
  description: string;
  price: number;
  type: 'house' | 'apartment' | 'land' | 'commercial';
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  features?: string[];
  status: 'available' | 'sold' | 'rented' | 'pending';
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PropertySearchFilters {
  search?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  bedrooms?: number;
  bathrooms?: number;
  status?: string;
  page?: number;
  limit?: number;
}

export interface PropertyResponse {
  success: boolean;
  message: string;
  data: Property | Property[] | { properties: Property[]; total: number; page: number; limit: number };
}

export class PropertyService {
  private async getPropertiesCollection() {
    const db = await getDatabase();
    return db.collection('properties');
  }

  async getAllProperties(filters: PropertySearchFilters = {}): Promise<PropertyResponse> {
    try {
      const properties = await this.getPropertiesCollection();
      const {
        search,
        type,
        minPrice,
        maxPrice,
        city,
        bedrooms,
        bathrooms,
        status = 'available',
        page = 1,
        limit = 10
      } = filters;

      // Build query
      const query: any = { status };

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { 'location.city': { $regex: search, $options: 'i' } }
        ];
      }

      if (type) {
        query.type = type;
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
      }

      if (city) {
        query['location.city'] = { $regex: city, $options: 'i' };
      }

      if (bedrooms) {
        query.bedrooms = { $gte: bedrooms };
      }

      if (bathrooms) {
        query.bathrooms = { $gte: bathrooms };
      }

      // Calculate pagination
      const skip = (page - 1) * limit;
      const total = await properties.countDocuments(query);

      // Execute query with pagination
      const propertiesList = await properties
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

      return {
        success: true,
        message: 'Properties retrieved successfully',
        data: {
          properties: propertiesList,
          total,
          page,
          limit
        }
      };
    } catch (error) {
      throw new AppError('Failed to retrieve properties', 500);
    }
  }

  async getPropertyById(id: string): Promise<PropertyResponse> {
    try {
      const properties = await this.getPropertiesCollection();
      const property = await properties.findOne({ _id: id });
      if (!property) {
        throw new AppError('Property not found', 404);
      }

      return {
        success: true,
        message: 'Property retrieved successfully',
        data: property
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to retrieve property', 500);
    }
  }

  async createProperty(propertyData: Omit<Property, '_id' | 'createdAt' | 'updatedAt'>): Promise<PropertyResponse> {
    try {
      const properties = await this.getPropertiesCollection();
      const newProperty: Property = {
        ...propertyData,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await properties.insertOne(newProperty);
      const propertyId = result.insertedId.toString();

      const createdProperty = await properties.findOne({ _id: propertyId });
      if (!createdProperty) {
        throw new AppError('Failed to create property', 500);
      }

      return {
        success: true,
        message: 'Property created successfully',
        data: createdProperty
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to create property', 500);
    }
  }

  async updateProperty(id: string, updateData: Partial<Omit<Property, '_id' | 'createdAt' | 'ownerId'>>): Promise<PropertyResponse> {
    try {
      const properties = await this.getPropertiesCollection();
      const updateFields = {
        ...updateData,
        updatedAt: new Date()
      };

      const result = await properties.updateOne(
        { _id: id },
        { $set: updateFields }
      );

      if (result.matchedCount === 0) {
        throw new AppError('Property not found', 404);
      }

      const updatedProperty = await properties.findOne({ _id: id });
      if (!updatedProperty) {
        throw new AppError('Property not found', 404);
      }

      return {
        success: true,
        message: 'Property updated successfully',
        data: updatedProperty
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update property', 500);
    }
  }

  async deleteProperty(id: string): Promise<PropertyResponse> {
    try {
      const properties = await this.getPropertiesCollection();
      const result = await properties.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new AppError('Property not found', 404);
      }

      return {
        success: true,
        message: 'Property deleted successfully',
        data: { _id: id } as any
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to delete property', 500);
    }
  }

  async getPropertiesByOwner(ownerId: string): Promise<PropertyResponse> {
    try {
      const properties = await this.getPropertiesCollection();
      const propertiesList = await properties
        .find({ ownerId })
        .sort({ createdAt: -1 })
        .toArray();

      return {
        success: true,
        message: 'Properties retrieved successfully',
        data: propertiesList
      };
    } catch (error) {
      throw new AppError('Failed to retrieve properties', 500);
    }
  }
}
