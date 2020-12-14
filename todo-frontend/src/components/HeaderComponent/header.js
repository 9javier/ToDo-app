import { React, Fragment } from 'react';
import './header.style.css';

const HeaderComponent = () => (
    <Fragment>
        <nav class="navbar navbar-dark bg-primary" >
            <a class="navbar-brand">Todo app</a>
            {
                /**<div className="content-user">
                <i class="fas fa-user-circle    | " id="user-image"></i>
                <i class="fas fa-ellipsis-v " id="settings-icon"></i>
               </div> */
            }
        </nav>
    </Fragment>
 
)


export default HeaderComponent;