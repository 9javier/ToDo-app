import React,{ useEffect, useState  }from 'react';
import './task.style.css';
import axios from 'axios';
import {Popover, OverlayTrigger ,Button} from 'react-bootstrap'
import Overlay from 'react-bootstrap/Overlay'
import PropTypes from 'prop-types';


class TaskComponent extends React.Component {

    constructor(props){
        super(props);
    }

    
    state = {
        stateTask: false,
        target: null,
        show: false,
        ref: null,
        taskId: this.props.id,
        actionNumber: 0
    }

   

    componentWillMount () {
        this.setState({stateTask: parseInt(this.props.state) == 1 ? true : false}); 
              
    }

    handleStateTask =(event)=>{
        const value = event.target.checked;
        this.setState({stateTask: value})
        this.updateStateTask(this.props.id, value);
    }

    updateStateTask(id,state){
        const body={ completed: state};
        axios.patch(`${process.env.REACT_APP_API_BASE_URL}/todos/${id}`,body)
        .then( res =>{
            if(res){
            }
        });
    }

    handleClick = (event) => {
        this.setState({show:!this.state.show,
            target: event.target
        
        })
      };

      modalDissmis = () =>{
          this.setState({show: false})
      }

    
    
      editTaskEvent= ()=>{
      }     
    

    render(){
        const { handleTask } = this.props;
        const { editTaskEvent } = this.props;

        return(
            <div className="content-card-task">

                <div class="card">
                    <div class="card-body">
                        <div class="form-check" id="form-task">
                            <input type="checkbox" class="form-check-input" id="check-task"
                                checked={this.state.stateTask}
                                value={this.state.stateTask}
                                onChange={ this.handleStateTask}/>
                            <label class="form-check-label" for="exampleCheck1" 
                            className={this.state.stateTask == true ? 'lblTaskEnd': ''}>{this.props.title}</label>
                           <div id="card-settings">
                                <div ref={this.state.ref}>

                                    <i class="fas fa-ellipsis-v" placement="right" id="icon-setting-task" onClick={this.handleClick}></i>

                                    <Overlay 
                                    disabled
                                        show={this.state.show}
                                        target={this.state.target}
                                        placement="bottom"
                                        containerPadding={20}>
                                        <Popover id="popover-contained">
                                            <Popover.Title as="h3" id="title-action" onClick={this.modalDissmis}>Acción</Popover.Title>
                                            <Popover.Content>
                                            {/*<button  type="button" class="btn btn-light" onClick={()=>editTaskEvent(this.state)} onChange={()=>this.changeActionModal}>Editar</button><br></br>*/}
                                            <button type="button" class="btn btn-danger" 
                                            onClick={()=>handleTask(this.state) }>Eliminar Tarea</button>
                                            </Popover.Content>
                                        </Popover> 
                                    </Overlay>
                                </div>
          
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    
}


TaskComponent.propTypes = {
    handleTask: PropTypes.func.isRequired,
    editTaskEvent: PropTypes.func.isRequired
}

export default TaskComponent;