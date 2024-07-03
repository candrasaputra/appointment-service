/* eslint-disable import/no-extraneous-dependencies */
import express, { Application, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { PORT } from 'src/config';
import { errorHandler } from 'src/controllers/middlewares/handle-error-code';

import { init } from 'src/init';
/**
 * Setup the application routes with controllers
 * @param app
 */
async function setupRoutes(app: Application, dependencies: any) {
    const { rootController, appointmentController } = dependencies;

    app.use('/api/v1/appointment', appointmentController.getRouter());
    app.use('/', rootController.getRouter());
}

/**
 * Main function to setup Express application here
 */
export async function createApp(): Promise<any> {
    const app = express();
    app.set('port', PORT);
    app.use(helmet() as RequestHandler);
    app.use(compression());
    app.disable('x-powered-by');
    app.use(bodyParser.json() as RequestHandler);
    app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);

    // cors config
    app.use(
        cors({
            origin: ['*'],
            exposedHeaders: ['x-csrf-token']
        })
    );

    app.use((req, res, next) => {
        req.headers.origin = req.headers.origin || req.headers.host;
        next();
    });

    const dependencies = await init();
    await setupRoutes(app, dependencies);

    // In order for errors from async controller methods to be thrown here,
    // you need to catch the errors in the controller and use `next(err)`.
    // See https://expressjs.com/en/guide/error-handling.html
    app.use(errorHandler());

    return { app, dependencies };
}
