import React, { Fragment,useState,useEffect } from 'react';
import './task-info.style.css';
import {Form} from 'react-bootstrap';
import TODO_SERVICES from '../../services/to-do-services';

const TaskInfoComponent = (props) => {

    const [stateView,setStateView] = useState(true);
    const [task,setTask] = useState({title: '',description: '', status: 0});
    const todoServices = new TODO_SERVICES();

    useEffect(async () => {
        getTaskById(props.id)
    },task);

    const getTaskById = async (id) =>{
        const todoServices = new TODO_SERVICES();
        const result = await todoServices.getTaskById(id);
        const {title,name, completed} = result.response;
        setTask({title,description: name, status: completed });
    }

    const deleteTask = async (id)=>{
       await todoServices.deleteTodoById(id);
    }

    const handleclose =(e)=>{
      e.closeInfo = false;
    }

    const handleModalEdit = (e) =>{
        e.modalEdit = true;
        e.taskId = props.id;
    }

    const handleModalDelete = (e) =>{
        deleteTask(props.id)
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
        const res = await todoServices.updateTaskState(props.id,body);
        getTaskById(props.id);
    }

    return (
        <Fragment>
            { stateView == true ?
            <div className="task-info-main">
            {/*<div className="header"><i id="close-info" class="fas fa-times" onClick={handleclose}></i></div>*/}
            

                    <button type="button" id="close-info"  class="close" aria-label="Close" onClick={handleclose}>
                        <span aria-hidden="true">&times;</span>
                    </button>  

            <div className="wrap-task-info">

                {/**Task Info Body */}
            <div className="task-info-body">
            <h3>{task.title}</h3>
            <Form.Control as="select" id="select-state" value={task.status} onChange={handleState}
            className="input-text" id="input-text">
                <option value={0}>Status: Pending</option>
                <option value={1}>Status: Completed</option>
            </Form.Control>
            <strong>Created</strong>
            <p>24/Jan/2021</p>
            <strong>Description</strong>
            <div className="text-description">
            <p>{task.description}</p>
            </div>
            <p>Update Today, 02:35pm,
                <br></br>by Peter Smith
            </p>
            <div>
                <button className="button-normal" id="button-normal" onClick={handleModalEdit}><i class="fas fa-pencil-alt"  id="icon-image"></i>{' '}Edit</button>
                <button className="button-normal" id="button-normal" onClick={handleModalDelete}><i class="fas fa-trash-alt" id="icon-image"></i>{' '}Delete</button>
            </div>
            </div>
           
            </div>
            
        </div> 
        :''
            }
             
        </Fragment>
    )
}

export default TaskInfoComponent;