import Todo  from '../models/todo.model'; 


export default class ProductServices {
    constructor() {

    }
    /**Get All Todos */
    async getAllTodos() {
        return await Todo.findAll();
    }

    /**Create a new Todo */
    async postNewTodo(todo:any){
        return await Todo.create(todo)
    }

    /**Get One Todo By Id */
    async getTodoById(id_todo:number){
        return await Todo.findByPk(id_todo);
    }

    /**Update a complete Todo */
    async updateTodoById(todo:Todo){
        console.log(todo)
        const id_todo:any = todo.id;
        Todo.update({...todo},
            {where: {id: id_todo}}
          );
    }

    /**Update a Todo Patch */
  async  updateCompleted(id:number,completed:Boolean){
      return await  Todo.update({
            completed,
        },{
            where:{ id: id}
        });
    }

    /* Delete Todo By Id*/
   async  deleteTodoById(id:any){
      await Todo.destroy({
            where:{ id: id}
        });
    }
}


