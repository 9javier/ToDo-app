import React,{ Fragment} from 'react';
import './task.style.css';


class TaskComponent extends React.Component {
    constructor(props){
        super(props);
    }
 
    state = {
        
    }

    componentWillMount () {
    console.log(this.props)
    }

    render(){
 return(
     /** Card Task */
     <Fragment>
         
            <td><a class="fas fa-check-circle" id={this.props.status == "1" ? 'check-active' :'check-desactive'}></a></td>
            <td>{this.props.title}</td>
            <td>{this.props.date}</td>
            <td>{this.props.name}</td>
     </Fragment>
        )
    }
    
}

export default TaskComponent;