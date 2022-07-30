import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
//documentation
import swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import swaggerDocument from './config/swagger.json';

// db
import mongoose from 'mongoose';
// routes
import itemsRouter from './routes/items';
import toursRouter from './routes/tours';


// setup
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 9001;

// middleware
app.use(compression()); // gzip
app.use(helmet()); // xss and other stuff
app.use(cors()); // cors
app.use(express.json()); // json

//docs
app.use(
    '/docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);

app.use((req: Request, res: Response, next) => {
    console.log(req.path, req.method);
    next();
});
// routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server with gzip, helmet and nodemon');
// });
app.use('/api/items', itemsRouter);
app.use('/api/tours', toursRouter);

// connect to DB
// const DB_URI = 'mongodb://localhost:27017/testDB';
const DB_URI = 'mongodb://andrei:nHZtFji3qPejxVLyzGVJaejX@localhost:27017/testDB?authSource=admin';
// const DB_OPTIONS = {
//   auth: { authSource: 'admin' },
//   user: process.env.MONGO_USER,
//   pass: process.env.MONGO_PASS,
//   useMongoClient: true,
// };

mongoose.connect(DB_URI)
    .then(() => {
    // only start listening once connected to db
        app.listen(port, () => {
            console.log(`⚡️[Bukemes]: Express backend is running at https://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// start

/*
/signup
/login
/auth
/logout
*/
