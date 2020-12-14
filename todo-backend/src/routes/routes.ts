import * as express from "express"
import TodoRoutes  from './Todos.routes/todo.routes';
import * as cors from 'cors';

const router = express.Router();
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
    ],
    credentials: false,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:3000',
    preflightContinue: false,
  };

  router.use(cors(options));
  router.options('*', cors(options))
  
router.use('/api/todos',TodoRoutes);


export default router;