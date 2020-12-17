import * as express from "express"
import TodoController from "../../controllers/TodoController";

const router = express.Router();
const todoController = new TodoController();

router.get(`/all`, (req, res, next) => {
   return todoController.getAllTodos(req,res,next);
});

router.post('',(req,res,next) =>{
   return todoController.postCreateTodo(req,res,next);
});

router.get('/:id',(req,res,next) =>{
   return todoController.getTodoById(req,res,next);
});

router.put('/edit',(req,res,next) =>{
   return todoController.updateTodoById(req,res,next);
});

router.patch('/:id',(req,res,next) =>{
   return todoController.updateCompletedOfTodo(req,res,next);
});

router.delete('/:id',(req,res,next) =>{
   return todoController.deleteTodoById(req,res,next);
});


export default router;