import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TODO_SERVICES from '../../../services/to-do-services';

  class ModalTaskComponent extends React.Component{

    constructor(props,todoServices ){
      super(props);
      this.todoServices = new TODO_SERVICES();
  }


    state = {
      modalState: true,
      txtTask: ''
    }

    componentWillMount() {
      this.getTask(this.props.idTask);
   }

   async getTask(id){
    const todo = await this.todoServices.getTaskById(id);
    this.setState({txtTask: todo.response.title})
   }

    async editTask (){
      const textNewTask = this.state.txtTask;
      let body = {id:this.props.idTask,title:  textNewTask, name: textNewTask};
      await this.todoServices.updateTask(body);
  }

  inputTask = (event) =>{
      this.setState({ txtTask: event.target.value });
  }
    
    render(){

    const handleModalEdit = (e)=>{
      this.editTask();
        e.modalEdit = true;
        this.setState({modalState: false})
    }


      return(
        <Fragment>
  <Modal show={this.state.modalState} onHide={this.state.modalState}
       size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
       <Modal.Header>
         Editar Tarea
               </Modal.Header>
       <Modal.Body>
         <div class="md-form active-purple-2 mb-3" id="active-purple-2">
           <input id="title-task" class="form-control" type="text" onChange={this.inputTask}
             placeholder="Editar Tarea" aria-label="Search" value={this.state.txtTask}/>
         </div>        
         </Modal.Body>
       <Modal.Footer>
         <Button onClick={handleModalEdit}>Cancelar</Button>
         <Button onClick={handleModalEdit}>Guardar</Button>
       </Modal.Footer>
     </Modal>
   </Fragment>  
      )
    }
    

  }
  
    
export default ModalTaskComponent;