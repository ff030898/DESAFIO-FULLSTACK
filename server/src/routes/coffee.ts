import { Router } from 'express'
import RequestsController from '../controller/RequestsController'

const routes = Router()
const requestsController = RequestsController

routes.get('/requests', requestsController.index)
routes.get('/requests/:id', requestsController.show)
routes.post('/requests', requestsController.create)
routes.put('/requests/:id', requestsController.store)
routes.delete('/requests/:id', requestsController.destroy)

export default routes
