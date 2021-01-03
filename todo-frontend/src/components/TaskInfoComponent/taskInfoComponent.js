import React, { Fragment,useState,useEffect } from 'react';
import './task-info.style.css';
import {Form} from 'react-bootstrap';
import TODO_SERVICES from '../../services/to-do-services';
import { format } from "date-fns";
import {connect } from 'react-redux';
import {show_edit, close_edit} from '../../redux/actions/modalEdit.actions';

const TaskInfoComponent = ({id,show_edit}) => {

    const [stateView,setStateView] = useState(true);
    const [task,setTask] = useState({title: '',description: '', status: 0, date: ''});
    const todoServices = new TODO_SERVICES();

    useEffect(async () => {
        getTaskById(id)
    },task);

    const getTaskById = async (id) =>{
        const todoServices = new TODO_SERVICES();
        const result = await todoServices.getTaskById(id);
        const {title,description, completed,date} = result.response;
        const dateFormat = new Date(date+'');
        setTask({title,description, status: completed, date: format(dateFormat, "dd/MMM/yyyy")});
    }

    const deleteTask = async (id)=>{
       await todoServices.deleteTodoById(id);
    }

    const handleclose =(e)=>{
      e.closeInfo = false;
    }

    const handleModalEdit = (e) =>{
        e.modalEdit = true;
        e.taskId = id;
    }

    const handleModalDelete = (e) =>{
        deleteTask(id)
        e.modalDelete = true;
    }

    const handleState = async (e) =>{
        e.modalState = true;
        const valueSelect = e.target.value;
        let body = {completed: valueSelect == 1 ? true : false};
        updateStateTask(body);
    }

    const updateStateTask = async (body) =>{
        const todoServices = new TODO_SERVICES();
        const res = await todoServices.updateTaskState(id,body);
        getTaskById(id);
    }

    return (
        <Fragment>
            { stateView == true ?
                <div className="task-info-main">
                    <button type="button" id="close-info" class="close" aria-label="Close" onClick={handleclose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="wrap-task-info">
                        {/**Task Info Body */}
                        <div className="task-info-body">
                            <h3>{task.title}</h3><br />
                            <Form.Control as="select" id="select-state" value={task.status} onChange={handleState}
                                className="input-text" id="input-text">
                                <option value={0}>Status: Pending</option>
                                <option value={1}>Status: Completed</option>
                            </Form.Control><br></br>
                            <strong>Created</strong><br />
                            <p>{task.date}</p>
                            <strong>Description</strong>
                            <div className="text-description">
                                <p>{task.description}</p>
                            </div>
                            <p>Update Today, 02:35pm,
                                <br></br>by Peter Smith
                            </p>
                            <div>
                                <button className="button-normal" id="button-normal" onClick={show_edit}><i class="fas fa-pencil-alt" id="icon-image"></i>{' '}Edit</button>
                                <button className="button-normal" id="button-normal" onClick={handleModalDelete}><i class="fas fa-trash-alt" id="icon-image"></i>{' '}Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                : ''
            }
        </Fragment>
    )
}

const mapStateToProps = (state)=>{
    console.log(state)
    return{
        state
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        show_edit: ()=> dispatch(show_edit())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskInfoComponent);