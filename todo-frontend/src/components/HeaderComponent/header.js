import { React, Fragment,useState } from 'react';
import './header.style.css';
import { Form } from 'react-bootstrap';
import {connect} from 'react-redux';
import {show, close} from '../../redux/actions/modalCreate.actions';

const HeaderComponent = ({ show,modalCreateTask}) => {

   const openTask = (e) =>{
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
                    <button variant="link" onClick={show} className="button-task" id="button-task">
                        <i class="fas fa-plus-circle"></i>{' '}
                        Add Task
                    </button>
                </div>
            </nav>
        </Fragment>
    )
}
const mapStateToProps = (state)=>{
    return{
        state
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        show: ()=> dispatch(show()),
        close: ()=> dispatch(close())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(HeaderComponent);