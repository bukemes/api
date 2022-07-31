//currently unused
import mongoose from 'mongoose';
import logger from './logger';

export default async function connect() {
    const URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_SOURCE}`;

    mongoose.connect(URI)
        .then(() => {
            logger.info('Connected to MongoDB');
        })
        .catch((error) => {
            logger.error(error.message);
            process.exit(1);
        });
}
