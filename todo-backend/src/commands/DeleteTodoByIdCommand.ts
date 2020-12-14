 
import Todo from 'models/todo.model';
import TodoService from '../services/todoService';

 export default class DeleteTodoByIdCommand{
    constructor(){
    
    }

    async deleteTodoById(id:number){
        const postNewTodo = new TodoService();
        return await postNewTodo.deleteTodoById(id);
    }

  
 
}
