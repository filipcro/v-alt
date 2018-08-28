import { config } from 'dotenv';
config();

import * as express from 'express';
import * as bodyParser from 'body-parser';

import { errorHandling } from './middleware/error'
import { connectDB } from './utils/db'; 
import { applyRoutes } from './controller';





connectDB().then(async connection => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    applyRoutes(app);

    app.use(errorHandling);
    app.listen(process.env.PORT);
}).catch(error => console.log(error));
