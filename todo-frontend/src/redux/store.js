import {createStore} from 'redux';
import rootReducers from './reducers';

//Store
//Almacenamiento de nuestro estado
const store = createStore(rootReducers);


export default store;