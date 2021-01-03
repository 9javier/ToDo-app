import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import Home from './components/HomeComponent/home';
import { Provider } from 'react-redux';
import  store from './redux/store';

function App() {
  return (
    <Fragment className="App">
          <Provider store={store}>
            <Home/>
          </Provider>      
          
   </Fragment>
  );
}

export default App;