import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const server = require('http').createServer(app);


app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);