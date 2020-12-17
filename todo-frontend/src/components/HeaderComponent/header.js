import { React, Fragment,useState } from 'react';
import './header.style.css';
import { Dropdown,DropdownButton,ButtonToolbar} from 'react-bootstrap';
import styled from './header.style.css';

const HeaderComponent = () => {

    const [show, setShow] = useState(false);
    const [wallper, setWallper] = useState('');
    const parisTheme = () => {
        setWallper(`
        background: url('https://image.winudf.com/v2/image/Y29tLldvcmxkV29uZGVyc0xpdmVXYWxscGFwZXJfc2NyZWVuXzNfMTUzODYzMTc4OF8wMDA/screen-3.jpg?fakeurl=1&type=.jpg') no-repeat center center fixed;
        `
        )
    }
    const machuTheme = () => {
        setWallper(`
    background: url('https://1.bp.blogspot.com/_XF_J0xP6x-w/TUfyRodxqmI/AAAAAAAAAxM/joyEqoEQjXc/s1600/machu-picchu-1.jpg') no-repeat center center fixed;
    `
        )
}


const StoneTheme = () => {
    setWallper(`
background: url('https://www.todopaisajes.com/Imagenes/stonehenge.jpg') no-repeat center center fixed;
`)
}

    return(
        
<Fragment>
<style>{ `body { ${wallper} 
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
}`}
</style>
        <nav class="navbar navbar-dark bg-primary" >
            <a class="navbar-brand">Lista de Tareas</a>
            <ButtonToolbar className="dropdown-example">
            <DropdownButton   alignEnd title={ <a> Tema<i class="fas fa-fill-drip " id="settings-icon"></i></a>} >
                <a id="Theme" onClick={()=>parisTheme()}>París <i class="fas fa-image"></i></a><br></br>
                <a id="Theme" onClick={()=>machuTheme()}>Machu Picchu<i class="fas fa-image"></i></a>
                <a id="Theme"onClick={()=>StoneTheme()}>Stonehenge<i class="fas fa-image"></i></a>
            </DropdownButton>
            </ButtonToolbar>
        </nav>
    </Fragment>
    )

}

    


   


export default HeaderComponent;