import React, { Fragment } from 'react';
import HeaderComponent from '../HeaderComponent/header';
import TaskComponent from '../TaskComponent/task';
import './home.style.css';
import TODO_SERVICES from '../../services/to-do-services';
import  ModalTaskComponent  from './ModalTask/modal.task';
import  ModalTaskCreate  from './ModalTask/modal.create';
import Table from 'react-bootstrap/Table';
import TaskInfoComponent from '../TaskInfoComponent/taskInfoComponent';
import { format } from "date-fns";
import { connect } from 'react-redux';
import {show, close} from '../../redux/actions/modalCreate.actions';
import {show_edit, close_edit} from '../../redux/actions/modalEdit.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 class Home extends React.Component {

    constructor(props,todoServices ){
        super(props);
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
        console.log(this.props)
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
                this.setState({taskList: tasks.response,infoTask: false})
                this.msgSuccess('Tarea Modificada!!');
             }, 600);            
        }
    }

    handleCreateModal = (e) =>{
        if(e.modalCreate == true){
            setTimeout(async ()=>{
            this.setState({createModal: false})
            this.getAllTask();
            this.msgSuccess('Tarea Creada!!');
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
                this.msgSuccess('Tarea Eliminada!!')
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

    handlerFilter = async (e)=>{
        if(e.dateTask == true){
            const tasks = await this.todoServices.getAllTodos();
            this.setState({taskList: tasks.response})
            let filterTask = this.state.taskList.filter(
                (task) => {
                    const dateFormat = new Date(task.date);
                    let date = format(dateFormat, "yyyy-MM-dd");
                    console.log("dsa",date,"FDSf",e.dateValue)
                    return date.indexOf(
                        e.dateValue) !== -1
                }
            );
            if(filterTask.length >0){
                this.setState({taskList: filterTask});
            }else{
                this.msgError('No se encontró ninguna tarea!!')
            }
        }
    }

    dateTask = (date)=>{
        const dateFormat = new Date(date+'');
        return format(dateFormat, "dd/MMM/yyyy")
    }
  
    msgSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    msgError = (msg)=>{
        toast.error(msg, {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    render() {
return (
    <Fragment>
        <br></br><h3 id="title-app">My Tasks</h3>
        <ToastContainer />
        <div className="main-content" class="d-flex justify-content-center">
            <div className="content-table">
                {
                    this.state.infoTask == true ?
                        <div className="task-info-wrap">
                            <div className="task-info" onClick={this.handleTaskInfo} 
                                onChange={this.handleTaskChange}>
                                <TaskInfoComponent id={this.state.editTakId}/>
                            </div>
                        </div> : ''
                }
                <div onClick={this.handlerNewTask} onChange={this.handlerFilter}>
                    <HeaderComponent />
                </div>
                {/**Task Table */}
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th className="column-date">Created</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.taskList.map((task, index) => {
                                return (
                                    <tr className="row-task" onClick={() => this.openTask(task.id)} >
                                        <TaskComponent id={task.id} title={task.title} 
                                        date={this.dateTask(task.date)} desc={task.description}
                                         status={task.completed} />
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                {  /**   Modal Create Task */
                   this.props.state.modalCreateTask == true ?
                            <div onClick={this.handleCreateModal}><ModalTaskCreate /></div>:
                        ''}

                {  /**   Modal Edit Task */
                   this.props.state.modalEditTask == true ?
                        <div onClick={this.handleModalEdit}>
                            <ModalTaskComponent idTask={this.state.editTakId} />
                        </div> : ''}
            </div>
        </div>
        <div className="wallper"></div>
    </Fragment>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        state
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        show: ()=> dispatch(show()),
        close: ()=> dispatch(close()),
        show_edit: ()=> dispatch(show_edit()),
        close_edit: ()=> dispatch(close_edit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)