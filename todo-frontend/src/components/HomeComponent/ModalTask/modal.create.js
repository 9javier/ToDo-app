import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TODO_SERVICES from '../../../services/to-do-services';

  class ModalTaskCreate extends React.Component{

    constructor(props,todoServices ){
      super(props);
      this.todoServices = new TODO_SERVICES();
  }

    state = {
      modalState: true,
      txtTask: ''
    }

      async createTask() {

          if (this.state.txtTask != "" && this.state.txtTask.length > 0) {
              const taskName = this.state.txtTask;
              const todo = { name: taskName, title: taskName, completed: false }
              let response = await this.todoServices.createTodo(todo);

          }
      }

  inputTask = (event) =>{
      this.setState({ txtTask: event.target.value });
  }
    
    render(){

    const handleModalCreate = (e)=>{
        this.createTask();
        e.modalCreate = true;
        this.setState({modalState: false})
    }

    const dismiss = (e) =>{
      console.log("Hijo: Cancelar")
      e.modalCreate = false;
      this.setState({modalState: false})
    }


      return(
        <Fragment>
    <Modal show={this.state.modalState} onHide={this.state.modalState}
       size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
       <Modal.Header>
         Crear Tarea
       </Modal.Header>
       <Modal.Body>
         <div class="md-form active-purple-2 mb-3" id="active-purple-2">
           <input id="title-task" class="form-control" type="text" onChange={this.inputTask}
             placeholder="Crear Tarea" aria-label="Search" value={this.state.txtTask}/>
         </div>        
         </Modal.Body>
       <Modal.Footer>
         <Button onClick={dismiss}>Cancelar</Button>
         <Button onClick={handleModalCreate}>Guardar</Button>
       </Modal.Footer>
    </Modal>
   </Fragment>  
      )
    }
    

  }
  
    
export default ModalTaskCreate;