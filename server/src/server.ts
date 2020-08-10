import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import routes from './routes/coffee'
import { createServer } from 'http';

const app = express();
const server = createServer(app);

export const io = require('socket.io')(server)

io.on('connection', (socket:any) => {
  socket.emit('status', 'waiting')
})


app.use(cors())
app.use(express.json())
app.use(routes)
// catch all


// notFound
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found')
  res.status(404)
  next(error)
})

// catch all
app.use((error:Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500)
  res.json({ error: error.message})
})

server.listen(3333)
