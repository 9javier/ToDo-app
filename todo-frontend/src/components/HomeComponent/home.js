import React, { Fragment, useEffect, useState } from 'react';
import HeaderComponent from '../HeaderComponent/header';
import TaskComponent from '../TaskComponent/task';
import './home.style.css';
import TODO_SERVICES from '../../services/to-do-services';
import  ModalTaskComponent  from './ModalTask/modal.task';
import  ModalTaskCreate  from './ModalTask/modal.create';
export default class Home extends React.Component {

    constructor(todoServices ){
        super();
        this.todoServices = new TODO_SERVICES();
    }

    state = {
        taskList: [],
        showModal: false,
        editModal: false,
        createModal: false,
        txtTask: "",
        txtSearch: "",
        editTakId: 0
    }
    componentWillMount() {
        this.getAllTask();
    }

    async getAllTask() {
        let tasks = await this.todoServices.getAllTodos();
        if(tasks){
            this.setState({taskList: tasks.response})
        }
    }

    handleTaskInput = (event) => {
        this.setState({ txtTask: event.target.value })
    }

    handleTask =  (e) => {
        if (e.event == 'delete') {// delete event
            this.deleteTodoById(e.taskId)
        } else if (e.event == 'update') { //update event
            this.setState({ editModal: true, editTakId: e.taskId});
        }
    }
 
    deleteTodoById = async (id) => {
        setTimeout(async ()=>{
            let result = await this.todoServices.deleteTodoById(id);
            if(result) this.getAllTask();
         }, 600);            
    }

    inputSearch = (event) => {
        this.setState({ txtSearch: event.target.value })
    }

     handleModalEdit = async (e)=>{
        if(e.modalEdit == true){
            this.setState({editModal: false});
            setTimeout(async ()=>{
                const tasks = await this.todoServices.getAllTodos();
                this.setState({taskList: tasks.response})
             }, 600);            
        }
    }

    handleCreateModal = (e)=>{
        if(e.modalCreate == true){
            setTimeout(async ()=>{
            this.setState({createModal: false})
            this.getAllTask();
             }, 600);  
        }
    }

    render() {
        let filterTask = this.state.taskList.filter(
            (task) => {
                return task.title.toLowerCase().indexOf(
                    this.state.txtSearch) !== -1
            }
        );
return (
    <Fragment>
        {/**Header from app */}
        <HeaderComponent />
        {/* Input Search Task */}
        <div class="d-flex justify-content-center">
            <div className="task-content">
                <div class="md-form mt-0" id="input-search">
                    <input id="txtsearch" class="form-control" type="text" onChange={this.inputSearch}
                        placeholder="Tarea" aria-label="Search" maxLength="30" />
                </div>
                {/* Filter from Input*/
                    filterTask.map((task, index) => {
                        return (
                            <div onClick={this.handleTask}>
                                <TaskComponent key={index} title={task.title} state={task.completed} id={task.id} />
                            </div>);
                    })
                }
            </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <button type="button" class="btn btn-primary align-self-end "onClick={()=>this.setState({createModal: true})}>
                Crear Tarea <i class="fas fa-sticky-note"></i>
            </button>
        </div>

        {  /**   Modal Create Task */
        this.state.createModal == true ?
            <div onClick={this.handleCreateModal}>
                <ModalTaskCreate />
            </div> : ''}

        {  /**   Modal Edit Task */ 
         this.state.editModal == true ?
            <div onClick={this.handleModalEdit}>
                <ModalTaskComponent idTask={this.state.editTakId} />
            </div> : ''}
    </Fragment>
        )
    }
}
