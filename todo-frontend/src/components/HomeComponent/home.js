import  React ,{Fragment, useEffect, useState} from 'react';
import HeaderComponent  from '../HeaderComponent/header';
import TaskComponent from '../TaskComponent/task';
import './home.style.css';
import SearchComponent  from '../SearchComponent/search';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class Home extends React.Component {
    
   
    state = {
        API_URL: process.env.REACT_APP_API_BASE_URL,
        taskList: [],
        showModal: false,
        editModal: false,
        txtTask: "",
        txtEditTask:"",
        txtSearch:"",
        initState: [''],
    }

    componentDidMount() {
        
    }

    myReducer =()=>{
        const state = this.state.initState;
    }
   
    componentWillMount () {
      this.getAllTask();
        
    }

    async getAllTask(){
       await axios.get(`${process.env.REACT_APP_API_BASE_URL}/todos/all`)
        .then( res =>{
            if(res.data){
              this.setState({taskList: res.data.response})
            }
        });
    }

    createTask () {

            if(this.state.txtTask != "" && this.state.txtTask.length >0){
                const taskName = this.state.txtTask;
            const todo ={
                name: taskName,
                title: taskName,
                completed: false
            }
            
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/todos/`,todo)
            .then( res =>{
                if(res.data){
                  this.getAllTask();
                  this.setState({
                      showModal: !this.state.showModal,
                      txtTask:''
                    });
                }
            });
            }
        
    }

    editTask(){

    }

    handleTaskInput=(event)=>{
        this.setState({txtTask: event.target.value})
    }

    handleEditTaskInput=(event)=>{
        this.setState({txtEditTask: event.target.value})
    }
    
    hadleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    showEditModal(){
        this.setState({editModal: !this.state.editModal})
    }

    handleTask = (e)=>{
        console.log(e)
        this.deleteTodoById(e.taskId);
    }

    editTaskEvent = (e) =>{
       this.editTodoById(e.taskId)
       this.setState({editModal: !this.state.editModal });
    }

    editTodoById = async (id) =>{
        console.log(id)
    }

    deleteTodoById = async (id)=>{
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/todos/${id}`)
         .then( res =>{
             if(res){
                 this.getAllTask();
             }
         });
     }

     inputSearch =(event)=>{
       
        this.setState({txtSearch: event.target.value})    
     }

     render(){

        let filterTask = this.state.taskList.filter(
            (task)=>{
                return task.title.toLowerCase().indexOf(
                    this.state.txtSearch) !== -1
            }
        );


         return(
        <Fragment>
            <HeaderComponent/>
                 <div class="d-flex justify-content-center">
                     <div className="task-content">
                         <div className="search-content">

                             <div class="md-form mt-0" id="input-search">
                                 <input id="txtsearch" class="form-control" type="text" onChange={this.inputSearch}
                                     placeholder="Tarea" aria-label="Search" maxLength="30" />
                             </div>
                             <div>
                             </div>
                    </div>
                    {
                        filterTask.map((task,index) =>{
                            return (<TaskComponent handleTask={this.handleTask}
                                 editTaskEvent={this.editTaskEvent}
                                 key={index} title={task.title}
                                 state={task.completed} id={task.id} />)
                        })
                    }
                </div>
            </div>
                 <div class="d-flex justify-content-center mt-5">
                     <button type="button" class="btn btn-primary" 
                     onClick={()=>this.hadleModal()}>Crear Tarea</button>
                 </div>
             {/**   Create Modal Task */}
             <Modal show={this.state.showModal} onHide={()=>this.hadleModal()}  
             size="lg" aria-labelledby="contained-modal-title-vcenter"centered> 
                <Modal.Header>
                   Nueva Tarea
                </Modal.Header>
                <Modal.Body>
                <div class="md-form active-purple-2 mb-3" id="active-purple-2">
                    <input id="title-task" class="form-control" type="text" 
                    onChange={this.handleTaskInput} 
                    placeholder="Titulo de la tarea" aria-label="Search"/>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={()=>this.hadleModal()}>Cancelar</Button>
                <Button onClick={()=>this.createTask()}>Aceptar</Button>
                </Modal.Footer>
            </Modal> 
            {/**   Edit Modal Task */}
            <Modal show={this.state.editModal} onHide={()=>this.showEditModal()}  
             size="lg" aria-labelledby="contained-modal-title-vcenter"centered> 
                <Modal.Header>
                   Editar Tarea
                </Modal.Header>
                <Modal.Body>
                <div class="md-form active-purple-2 mb-3" id="active-purple-2">
                    <input id="title-task" class="form-control" type="text" 
                    onChange={this.handleEditTaskInput} 
                    placeholder="Editar Tarea" aria-label="Search"/>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={()=>this.showEditModal()}>Cancelar</Button>
                <Button onClick={()=>this.editTask()}>Aceptar</Button>
                </Modal.Footer>
            </Modal> 
        </Fragment>
            
         )
     }
     
        
            
    
}

