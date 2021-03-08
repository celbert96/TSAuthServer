import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { createConnection } from "typeorm";

import routes from './routes/index';
import users from './routes/user';

const app = express();

// parse incoming requests with JSON payloads
app.use(express.json());

// configure CORS to allow credentials (needed for setting HTTP Only cookies)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// parse the cookies included in incoming requests
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// set the port that the application will use, default 8080
app.set('port', process.env.PORT || 8080);

createConnection().then(() => {
    // launch app
    const server = app.listen(app.get('port'), () => {
        // tslint:disable-next-line:no-console
        console.log('Express server listening on port ' + server.address().port)
    });
}).catch(error => {
    // tslint:disable-next-line:no-console
    console.error('FATAL: COULD NOT CONNECT TO DATABASE: ' + error.message);
});


