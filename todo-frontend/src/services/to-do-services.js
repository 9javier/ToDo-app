import axios from 'axios';

export default class TODO_SERVICES {

    constructor(API_URL) {
        this.API_URL = process.env.REACT_APP_API_BASE_URL
    }

    async getAllTodos() {
        return await axios.get(`${this.API_URL}/todos/all`)
            .then(response => {return response.data});
    }

    async createTodo(body){
        return await axios.post(`${this.API_URL}/todos/`, body)
        .then(response => { return response});
    }

    async deleteTodoById(id) {
        return await axios.delete(`${this.API_URL}/todos/${id}`)
            .then(response => {return response });
    }

    async getTaskById(idTask) {
        return await axios.get(`${this.API_URL}/todos/${idTask}`)
            .then(response => {return response.data});
    }

    async updateTask(body) {
        await axios.put(`${this.API_URL}/todos/edit`, body)
            .then(response => { return response});
    }

    async updateTaskState(id,body) {
        await axios.patch(`${this.API_URL}/todos/${id}`, body)
            .then(response => { return response});
    }

}