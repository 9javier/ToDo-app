import { React, Fragment,useState } from 'react';
import './header.style.css';
import { Form } from 'react-bootstrap';

const HeaderComponent = () => {

   const handlerNewTask = (e) =>{
    e.newTask = true;
   }

   const handlerDate = (e) =>{
    e.dateTask = true;
    e.dateValue = e.target.value;
   }
    return(
        <Fragment>
            <nav class="navbar" >
                <strong>Tasks</strong>
                <div className="actions">
                    <Form.Control type="date" id="input-date" onChange={handlerDate} />
                    <button variant="link" onClick={handlerNewTask} className="button-task" id="button-task">
                        <i class="fas fa-plus-circle"></i>{' '}
                        Add Task
                    </button>
                </div>
            </nav>
        </Fragment>
    )
}
export default HeaderComponent;