import express from 'express';
import RequestsController from './controller/RequestsController';


const routes = express.Router();
const requestsController = new RequestsController();

routes.get('/requests', requestsController.index);
routes.get('/requests/:status', requestsController.show);
routes.post('/requests', requestsController.create);
routes.put('/requests/:id', requestsController.store);
routes.delete('/requests/:id', requestsController.destroy);


export default routes;