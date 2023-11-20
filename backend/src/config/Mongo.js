import { connect } from 'mongoose';

export default class MongoConnect {
    static count = 0;

    constructor(link) {
        if (!link) {
            throw new Error('URI is required for MongoDB connection');
        }

        this.link = link;
        ++MongoConnect.count;

        if (typeof MongoConnect.instance === 'object') {
            return MongoConnect.instance;
        } else {
            MongoConnect.instance = this;
            return this;
        }
    }

    async connectMongo() {
        if (!this.link) {
            throw new Error('URI is required for MongoDB connection');
        }

        try {
            await connect(this.link);
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error.message);
        }
    }

    single() {
        if (MongoConnect.count > 1) {
            console.log(`Additional instances created: ${MongoConnect.count - 1}`);
        } else {
            console.log('First instance created');
        }
    }
}