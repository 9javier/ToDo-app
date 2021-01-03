import React, { Fragment } from 'react';
import { Modal, Button,FormControl } from 'react-bootstrap';
import TODO_SERVICES from '../../../services/to-do-services';
import './modal-create.style.css';
import { connect } from 'react-redux';
import {show_edit, close_edit} from '../../../redux/actions/modalEdit.actions';
  class ModalTaskComponent extends React.Component{
    constructor(props,todoServices ){
      super(props);
      this.todoServices = new TODO_SERVICES();
  }
    state = {
      modalState: true,
      txtTask: '',
      txtDesc: ''
    }

    componentWillMount() {
      console.log(this.props)
      this.getTask(this.props.idTask);
   }

   async getTask(id){
    const todo = await this.todoServices.getTaskById(id);
    this.setState({txtTask: todo.response.title})
    this.setState({txtDesc: todo.response.description})
   }

    async editTask (){
      const textNewTask = this.state.txtTask;
      const description = this.state.txtDesc;
      let body = {id:this.props.idTask,title:  textNewTask, description};
      await this.todoServices.updateTask(body);
  }

  inputTask = (event) =>{
      this.setState({ txtTask: event.target.value });
  }

  inputDesc = (event) => {
    this.setState({txtDesc: event.target.value});
  }
    
    render(){
    const handleModalEdit = (e)=>{
      this.editTask();
        e.modalEdit = true;
        this.setState({modalState: false});
        this.props.close_edit();
    }

      return(
        <Fragment>
          <Modal show={this.props.state.modalEditTask} onHide={this.props.state.modalEditTask}
            aria-labelledby="contained-modal-title-vcenter" centered>
            <div className="main-modal">
              <div className="modalContent">
                <div className="modal-headers">
                  <strong>Edit Task</strong>
                </div><br></br>

                <label>Title(Required)</label>
                <FormControl className="input-text" id="input-text" onChange={this.inputTask}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={this.state.txtTask} />
                  
                <label>Description</label>
                <FormControl className="input-text" id="input-text" as="textarea" aria-label="With textarea"
                  onChange={this.inputDesc}
                  value={this.state.txtDesc} /><br></br>

                <div className="footer-modal">
                  <button onClick={this.props.close_edit} className="btn-cancel button">Cancel</button>
                  <button onClick={handleModalEdit} className="btn-save button">Save</button>
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
      show_edit: ()=> dispatch(show_edit()),
      close_edit: ()=> dispatch(close_edit())
    }
  }

  const mapStateProps = (state)=>{
    return {
     state
    }
  }

export default connect(
    mapStateProps,
    mapDispatchToProps
  )(ModalTaskComponent);