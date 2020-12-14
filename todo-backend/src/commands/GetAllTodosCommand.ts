 
import TodoService from '../services/todoService';

 export default class GetAllTodosCommand{
     
    constructor(){
    
    }

    async getAllTodos(){
        const todoService = new TodoService();
        return await todoService.getAllTodos();
    }
 
}
