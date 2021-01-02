import { React, Fragment,useState } from 'react';
import './header.style.css';
import { Button } from 'react-bootstrap';
import styled from './header.style.css';

const HeaderComponent = () => {

    const [show, setShow] = useState(false);
    const [wallper, setWallper] = useState('');
  

   const handlerNewTask = (e) =>{
    e.newTask = true;
   }

    return(
        <Fragment>
            <nav class="navbar" >
                <strong>Tasks</strong>
                <button variant="link" onClick={handlerNewTask} className="button-task" id="button-task">
                    <i class="fas fa-plus-circle"></i>{' '}
                Add Task
            </button>
            </nav>
        </Fragment>
    )

}

    


   


export default HeaderComponent;