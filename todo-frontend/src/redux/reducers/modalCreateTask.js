import { SHOW, CLOSE } from '../actions/modalCreate.actions';

const initialState = null;

function createTask (state = initialState,action){
    switch(action.type){
        case SHOW:
            return state = true;
        case CLOSE:
            return state = false; 
        default: 
        return state;
    }
}

export default createTask;