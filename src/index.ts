import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
// import helmet from 'helmet';
// import compression from 'compression';
// import cors from 'cors';

// setup
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 9001;

// middleware
// app.use(compression()); // gzip
// app.use(helmet()); // xss and other stuff
// app.use(cors()); // cors

// routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server with gzip, helmet and nodemon');
});

// start
app.listen(port, () => {
  console.log(`⚡️[Bukemes]: Express backend is running at https://localhost:${port}`);
});

/*
/signup
/login
/auth
/logout
*/
