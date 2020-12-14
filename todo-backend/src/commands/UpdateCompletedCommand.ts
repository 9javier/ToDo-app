 
import Todo from 'models/todo.model';
import TodoService from '../services/todoService';

 export default class UpdateCompletedCommand{
    constructor(){
    
    }

    async updateCompleteOfTodo(id_todo:number,body:any){
        const completed = body.completed;
        const postNewTodo = new TodoService();
        return await postNewTodo.updateCompleted(id_todo,completed);
    }

  
 
}
