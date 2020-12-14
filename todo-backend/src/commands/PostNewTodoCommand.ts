 
import TodoService from '../services/todoService';

 export default class PostNewTodoCommand{
    constructor(){
    
    }

    async postNewTodo(todo:any){
        const postNewTodo = new TodoService();
        return await postNewTodo.postNewTodo(todo);
    }

  
 
}
