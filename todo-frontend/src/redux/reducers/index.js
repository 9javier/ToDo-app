import { combineReducers } from 'redux';
import modalCreateTask from './modalCreateTask';
import modalEditTask from './modalEditTask';

export default combineReducers({
    modalCreateTask,
    modalEditTask
})