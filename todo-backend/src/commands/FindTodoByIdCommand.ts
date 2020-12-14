 
import TodoService from '../services/todoService';

 export default class FindTodoByIdCommand{
    constructor(){
    
    }

    async findById(id_todo:any){
        const postNewTodo = new TodoService();
        return await postNewTodo.getTodoById(id_todo);
    }

  
 
}
