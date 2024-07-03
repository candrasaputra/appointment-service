import { Request, NextFunction, Response } from 'express';
import { ErrorCodeMap } from 'src/libs/errors';

export const errorHandler = () => {
    // This is an express error handler
    // eslint-disable-next-line
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        // handle any if error code not there
        const statusCode = Number(ErrorCodeMap[err.error_code]);

        if (statusCode < 500) {
            return res.status(statusCode).send({
                error_code: err.error_code,
                message: err.message
            });
        }

        console.log('unexpected error', err);

        const Error500 = {
            error_code: 'SERVER_ERROR',
            message: 'Something unexpected happened, we are investigating this issue right now'
        };

        return res.status(500).send(Error500);
    };
};
