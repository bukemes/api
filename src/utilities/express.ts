// config & init
import express, { Application, Request, Response } from 'express';
// middleware
import compression from 'compression';
// security
import helmet from 'helmet'; // import xss from 'xss'; -> helmet.xss(); takes care of that.
import cors from 'cors'; // helmet contains cors? need to check. 
import cookieParser from 'cookie-parser';
// documentation
import swaggerUI from 'swagger-ui-express';
import openapiSpecification from './swagger';
// utilities
// import logger from './logger';
import { handleBodyParserErrors } from './utils';
// routes
import metadataRouter from '../routers/metadataRouter';
import toursRouter from '../routers/toursRouter';
import mediaRouter from '../routers/mediaRouter';
import scheduleRouter from '../routers/scheduleRouter';

// this was neccesary to split out so I could use the it with JEST & SUPERTEST
export default function setupExpress(){
    const app: Application = express(); // create express app
    // app.locals.connected_to_db = false; // set connected_to_db to false
    // MIDDLEWARE
    
    // security
    // app.use(helmet()); // xss and other stuff
    // app.use(cors()); // cors
    app.use(cors({
        credentials: true, 
        origin: 'http://localhost:9003',
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }));
    app.use(cookieParser()); // cookie parser
    // json
    app.use(express.json()); // json, defaults to {strict:true}
    app.use(handleBodyParserErrors); // handle express.json's bodyparses errors in case of eg bad json

    // API routes
    app.use('/api/metadata', metadataRouter);
    app.use('/api/tours', toursRouter);
    app.use('/api/media', mediaRouter);
    app.use('/api/schedules', scheduleRouter);

    // Docs
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));
    
    // images
    app.use('/api/', express.static('public')); // serve static files from public folder, put React App here when deploying

    // redirect to docs cases
    // app.use('/api/', redirectToDocs);
    // app.use('/api', redirectToDocs);
    // app.use('/', redirectToDocs);

    // React
    // app.use('/admin', express.static('public')); // serve static files from public folder, put React Admin here when deploying
    // app.use('/site', express.static('public/site')); // serve static files from public folder, put React App here when deploying
    
    // efficiency
    app.use(compression()); // gzip

    return app;
}

const redirectToDocs = (req: Request, res: Response) => {
    res.redirect('/api/docs');
};