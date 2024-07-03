/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import './module-alias';

import { createApp } from 'src/app';

/**
 * Start an Express server
 */
(async () => {
    try {
        const { app } = await createApp();

        app.listen(app.get('port'), () => {
            console.log(`Started express server on PORT ${app.get('port')}`);
        });
    } catch (err) {
        console.log('error caught in server.ts', err);
    }
})();
