import { SHOW_EDIT, CLOSE_EDIT } from '../actions/modalEdit.actions';

const initialState = null;

function editTask (state = initialState,action){
    switch(action.type){
        case SHOW_EDIT:
            return state = true;
        case CLOSE_EDIT:
            return state = false; 
        default: 
        return state;
    }
}

export default editTask;