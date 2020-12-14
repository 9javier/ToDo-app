import GetAllTodosCommand from '../commands/GetAllTodosCommand';
import PostNewTodoCommand from '../commands/PostNewTodoCommand';
import FindTodoByIdCommand from '../commands/FindTodoByIdCommand';
import UpdateTodoByIdCommand from '../commands/UpdateTodoByIdCommand';
import UpdateCompletedCommand from '../commands/UpdateCompletedCommand';
import DeleteTodoByIdCommand from '../commands/DeleteTodoByIdCommand';


export default class TodoController {

  constructor() {    
  }

   async getAllTodos(request, res, next) {
    try {
        const getAllProductsCommand = new GetAllTodosCommand();
        const response = await getAllProductsCommand.getAllTodos();
        return res.json({ status: 200, response });
  
    } catch (error) {
      next(error);
    }

  }

  async postCreateTodo(request,res,next){
     try {
      const postNewTodoCommand = new PostNewTodoCommand();
      const response = await postNewTodoCommand.postNewTodo(request.body);
      return res.json({ status: 201, response });
     } catch (error) {
       console.log("Error",error);
     }
  }

  async getTodoById(request,res,next){
    try{
      const findTodoByIdCommand = new FindTodoByIdCommand();
      const response = await findTodoByIdCommand.findById(request.query.id)
      return  res.json({ status: 200, response });
    }catch(error){
      console.log(error)
    }
  }


  async updateTodoById(request,res,next){
    try{
      const updateTodoByIdCommand = new UpdateTodoByIdCommand();
      const response = await updateTodoByIdCommand.updateTodoById(request.body)
      return  res.json({ status: 200, response });
    }catch(error){
      console.log(error)
    }
  }

  async updateCompletedOfTodo(request,res,next){
    try{
      const updateCompletedCommand = new UpdateCompletedCommand();
      const response = await updateCompletedCommand.updateCompleteOfTodo(request.params.id, request.body)
      return  res.json({ status: 200, response });
    }catch(error){
      console.log(error)
    }
  }


  async deleteTodoById(request,res,next){
    try{
      const deleteTodoByIdCommand = new DeleteTodoByIdCommand();
      const response = await deleteTodoByIdCommand.deleteTodoById(request.params.id)
      return  res.json({ status: 201, response });
    }catch(error){
      console.log(error)
    }
  }




}
