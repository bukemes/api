//config & init
import express, { Application } from 'express';
import dotenv from 'dotenv';
//middleware
import compression from 'compression';
//security
import helmet from 'helmet'; //import xss from 'xss'; -> helmet.xss(); takes care of that.
import cors from 'cors';
//documentation
import swaggerUI from 'swagger-ui-express';
import openapiSpecification from './swagger';
//db
import mongoose from 'mongoose';
//custom shit
import logger from './logger';
import { handleBodyParserErrors } from './utils';
// routes
import toursRouter from '../routers/toursRouter';

// setup
dotenv.config(); //get environment variables
const app: Application = express(); //create express app
const port = process.env.PORT || 9001; //create port variable

// middleware
//security
app.use(helmet()); // xss and other stuff
app.use(cors()); // cors
//json
app.use(express.json({strict:true})); // json
app.use(handleBodyParserErrors); //handle express.json's bodyparses errors in case of eg bad json
//docs
app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));
//efficiency
app.use(compression()); // gzip

//routes
app.use('/api/tours', toursRouter);

const DB_URI = 'mongodb://andrei:nHZtFji3qPejxVLyzGVJaejX@localhost:27017/testDB?authSource=admin';

mongoose.connect(DB_URI)
    .then(() => {
    // only start listening once connected to db
        app.listen(port, () => {
            logger.info(`⚡️[Bukemes]: Express backend is running at https://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });