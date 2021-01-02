import React, { Fragment, useEffect, useState } from 'react';
import HeaderComponent from '../HeaderComponent/header';
import TaskComponent from '../TaskComponent/task';
import './home.style.css';
import TODO_SERVICES from '../../services/to-do-services';
import  ModalTaskComponent  from './ModalTask/modal.task';
import  ModalTaskCreate  from './ModalTask/modal.create';
import Table from 'react-bootstrap/Table';
import TaskInfoComponent from '../TaskInfoComponent/taskInfoComponent';
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
        editTakId: 0,
        infoTask: false
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

    handleCreateModal = (e) =>{
        console.log(e)
        if(e.modalCreate == true){
            setTimeout(async ()=>{
            this.setState({createModal: false})
            this.getAllTask();
             }, 600);  
        }else if(e.modalCreate == false){
            this.setState({createModal: false})
        }
    }

    

    openTask=(taskId)=>{
        this.setState({infoTask: true,editTakId: taskId})
    }

    handleTaskInfo = (e) =>{
        if(e.closeInfo == false){
            this.setState({infoTask:false})
        }else if(e.modalEdit == true){
            this.setState({editModal: true});
        }else if(e.modalDelete == true){
            this.setState({infoTask: false});
            setTimeout(async ()=>{
                const tasks = await this.todoServices.getAllTodos();
                this.setState({taskList: tasks.response})
             }, 600); 
        }
    }

    handleTaskChange = (e) =>{
        if(e.modalState == true){
            setTimeout(async ()=>{
                const tasks = await this.todoServices.getAllTodos();
                this.setState({taskList: tasks.response})
             }, 600);
        }
    }

    handlerNewTask = (e) =>{
        if(e.newTask){
            this.setState({createModal: true})
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
               <h3 id="title-app">My Tasks</h3>

    <div className="main-content" class="d-flex justify-content-center">
             <div className="content-table">
             {
            this.state.infoTask == true ?
                <div className="task-info-wrap">
                    <div className="task-info" onClick={this.handleTaskInfo} onChange={this.handleTaskChange}>
                        <TaskInfoComponent id={this.state.editTakId}/>
                    </div>
                </div>: ''
        }
        <div onClick={this.handlerNewTask}>
        <HeaderComponent/>
        </div>
        {/**Task Table */}
        <Table responsive>
  <thead>
    <tr>
      <th></th>
      <th>Title</th>
      <th>Created</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
      {

          this.state.taskList.map((task,index) =>{
           return(
            <tr className="row-task" onClick={()=>this.openTask(task.id)} >
               <TaskComponent id={task.id} title={task.title} date="31-12-2020" name={task.name} status={task.completed}/>
            </tr>
               )
          })
      }
    
  </tbody>
</Table>
        
       
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
             </div>
        
    </div>
    </Fragment>
        )
    }
}
