import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export interface DatabaseConfig {
  uri: string;
  dbName: string;
  options?: any;
}

export class MongoDBConnection {
  private static instance: MongoDBConnection;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private config: DatabaseConfig;

  private constructor() {
    this.config = {
      uri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017',
      dbName: process.env['DB_NAME'] || 'ivorian_realty',
      options: {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    };
  }

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    try {
      console.log(`🔗 Connecting to MongoDB: ${this.config.uri}`);
      
      this.client = new MongoClient(this.config.uri, this.config.options);
      await this.client.connect();
      
      this.db = this.client.db(this.config.dbName);
      
      // Test the connection
      await this.db.admin().ping();
      
      console.log(`✅ Connected to MongoDB database: ${this.config.dbName}`);
      return this.db;
      
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('🔌 Disconnected from MongoDB');
    }
  }

  public getDatabase(): Db {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  public isConnected(): boolean {
    return this.db !== null && this.client !== null;
  }

  public async healthCheck(): Promise<boolean> {
    try {
      if (!this.db) {
        return false;
      }
      await this.db.admin().ping();
      return true;
    } catch (error) {
      console.error('MongoDB health check failed:', error);
      return false;
    }
  }
}

// Convenience function for easy import
export const getDatabase = async (): Promise<Db> => {
  const connection = MongoDBConnection.getInstance();
  return await connection.connect();
};

// Graceful shutdown handler
process.on('SIGINT', async () => {
  const connection = MongoDBConnection.getInstance();
  await connection.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  const connection = MongoDBConnection.getInstance();
  await connection.disconnect();
  process.exit(0);
});
