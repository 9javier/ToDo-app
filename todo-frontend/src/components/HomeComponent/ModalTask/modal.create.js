import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button ,FormControl} from 'react-bootstrap';
import TODO_SERVICES from '../../../services/to-do-services';
import './modal-create.style.css';

  class ModalTaskCreate extends React.Component{

    constructor(props,todoServices ){
      super(props);
      this.todoServices = new TODO_SERVICES();
  }

    state = {
      modalState: true,
      txtTask: '',
      txtDesc: ''
    }

      async createTask() {

          if (this.state.txtTask != "" && this.state.txtTask.length > 0) {
              const taskName = this.state.txtTask;
              const description = this.state.txtDesc;
              const todo = { name: description, title: taskName, completed: false }
              let response = await this.todoServices.createTodo(todo);
          }
      }

  inputTask = (event) =>{
      this.setState({ txtTask: event.target.value });
  }

  inputDesc = (event)=>{
    this.setState({txtDesc: event.target.value})
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
        aria-labelledby="contained-modal-title-vcenter" centered>
          <div className="main-modal">
          <div className="modalContent">
        <div className="modal-headers">
         <strong>New Task</strong>
       </div><br></br>
        <label>Title(Required)</label>
        <FormControl className="input-text" id="input-text"
        onChange={this.inputTask}
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"/>
      <label>Description</label>
      <FormControl as="textarea" aria-label="With textarea" onChange={this.inputDesc}
      className="input-text"  id="input-text"/><br></br>
     

        <div className="footer-modal">
        <button  onClick={dismiss} className="btn-cancel button">Cancel</button> 
        <button  onClick={handleModalCreate} className="btn-save button">Save</button>
        </div>
        
       
      
        </div>
          </div>
        
    
       {/*<Modal.Header>
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
       </Modal.Footer>*/}
    </Modal>
   </Fragment>  
      )
    }
    

  }
  
    
export default ModalTaskCreate;