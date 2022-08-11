import mongoose from 'mongoose';
import logger from './logger';

// logger.console;
// logger.db;
// OR
// console.log("info-to-console"); -> could be custom .logger implementation
// logger.log("info-to-db");

export default async function setupMongoose(): Promise<mongoose.Connection> {
    // const URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_SOURCE}`;
    const URI = 'mongodb://andrei:nHZtFji3qPejxVLyzGVJaejX@localhost:27017/testDB?authSource=admin';

    // connect to DB
    mongoose.connect(URI)
        // .then(() => {
        //     logger.info('database.ts: Connected to MongoDB');
        // })
        .catch((error) => {
            logger.error('Failed to connect to MongoDB');
            logger.error(error.message);
            process.exit(1);
        });
    
    const db = mongoose.connection;
    
    // middleware, log errors; 
    db.on('error', error => {
        logger.error(error.message);
    });

    db.on('open', function (ref) {
        logger.info('open connection to mongo server.');
    });
    
    db.on('connected', function (ref) {
        logger.info('connected to mongo server.');
    });

    db.on('disconnected', function (ref) {
        // connected=false;
        logger.error('disconnected from mongo server.');
    });
    
    db.on('close', function (ref) {
        // connected=false;
        logger.error('close connection to mongo server');
    });

    return db;
}


// // 0 = disconnected
// // 1 = connected
// // 2 = connecting
// // 3 = disconnecting
// // 99 = uninitialized
// // if(db.readyState !== 1){
// //     logger.error('MongoDB is not connected');
// //     process.exit(1);
// // }
// logger.info('db.readyState: ' + db.readyState);