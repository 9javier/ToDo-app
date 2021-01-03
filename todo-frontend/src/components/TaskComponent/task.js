import React,{ Fragment} from 'react';
import './task.style.css';


class TaskComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            /** Card Task */
            <Fragment>
                <td><a class="fas fa-check-circle" 
                 id={this.props.status == "1" ? 'check-active' : 'check-desactive'}></a>
                 </td>
                <td>{this.props.title}</td>
                <td className="column-date">{this.props.date}</td>
                <td>{this.props.desc}</td>
            </Fragment>
        )
    }
    
}
export default TaskComponent;