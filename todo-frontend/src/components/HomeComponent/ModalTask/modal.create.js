import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button ,FormControl} from 'react-bootstrap';
import TODO_SERVICES from '../../../services/to-do-services';
import './modal-create.style.css';
import { connect } from 'react-redux';
import {show, close} from '../../../redux/actions/modalCreate.actions';
  class ModalTaskCreate extends React.Component{

    constructor(props,todoServices){
      super(props);
      this.todoServices = new TODO_SERVICES();
  }

    state = {
      modalState: true,
      txtTask: '',
      txtDesc: '',
      validate: {title: false, desc: false}
    }

    componentWillMount() {
      console.log(this.props)  
    }


      createTask = async ()=> {
              const taskName = this.state.txtTask;
              const description = this.state.txtDesc;
              const todo = { description, title: taskName, completed: false }
              let response = await this.todoServices.createTodo(todo);
              this.closeModal();
      }

  inputTask = (event) =>{
      this.setState({ 
        txtTask: event.target.value, 
        validate:{title: false,desc:false}
      });
  }

  inputDesc = (event)=>{
    this.setState({
      txtDesc: event.target.value,
      validate:{title: false,desc:false}
    })
  }
    

   closeModal = ()=> {
    this.props.close()
   }

    openModal = ()=> {
     this.props.show()
     console.log(this.props)
   }



    render(){
    const handleModalCreate = (e)=>{
      if(validateForm() == true){
        e.modalCreate = true;
        this.createTask(); 
      }
    }

    const validateForm =()=>{
      const validate = this.state.validate;
      if(this.state.txtTask != "" && this.state.txtTask.length > 0){
        if(this.state.txtDesc != "" && this.state.txtTask.length > 0){
          return true;
        }else{
          this.setState({
            validate: {...this.state.validate,desc:true}
          })
        }
      }else{
        this.setState({
          validate: {...this.state.validate,title:true}
        })
      }
      return false
    }

    

  return(
        <Fragment>
      <Modal show={this.props.state.modalCreateTask} onHide={this.props.state.modalCreateTask}
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
              aria-describedby="basic-addon2" />
              <label id="label-error"
              className={this.state.validate.title == true ? 'error-active' : 'error-desactive'}> Required
              </label><br></br>
            <label>Description</label>
            <FormControl as="textarea" aria-label="With textarea" onChange={this.inputDesc}
              className="input-text" id="input-text" />
              <label id="label-error" 
                className={this.state.validate.desc == true ? 'error-active' : 'error-desactive'}>Required
              </label><br></br>
            <div className="footer-modal">
              <button onClick={this.closeModal} className="btn-cancel button">Cancel</button>
              <button onClick={handleModalCreate} className="btn-save button">Save</button>
            </div>
          </div>
        </div>
      </Modal>
   </Fragment>  
      )
    }
    

  }

  const mapDispatchToProps =(dispatch)=>{
    return {
      show: ()=> dispatch(show()),
      close: ()=> dispatch(close())
    }
  }

  const mapStateProps = (state)=>{
    return {
     state
    }
  }
  
    
export default connect(mapStateProps,mapDispatchToProps)(ModalTaskCreate);