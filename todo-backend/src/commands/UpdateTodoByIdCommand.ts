 
import Todo from 'models/todo.model';
import TodoService from '../services/todoService';

 export default class UpdateTodoByIdCommand{
    constructor(){
    
    }

    async updateTodoById(Todo:Todo){
        const postNewTodo = new TodoService();
        return await postNewTodo.updateTodoById(Todo);
    }

  
 
}
