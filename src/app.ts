// config
import dotenv from 'dotenv';
// db
// import mongoose from 'mongoose';
// custom
import logger from './utilities/logger';
import setupExpress from './utilities/express';
import setupMongoose from './utilities/database';

// setup
dotenv.config(); // get environment variables
app();
// logger.info(process.env);

async function app() {
    const db = await setupMongoose();

    db.once('open', function() {
        const express = setupExpress();
        const port = process.env.PORT || 9001; // create port variable
    
        // only start listening once connected to db
        express.listen(port, () => {
            logger.info(`API is running at http://localhost:${port}/api/`);
            logger.info(`Swagger is running at http://localhost:${port}/docs`);
        });
    });
    
}

