import React,{useEffect} from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import HomePage from './containers/HomePage';
import LogInPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import {useSelector, useDispatch} from 'react-redux';
import {isLoggedInUser} from './actions/auth.actions'

function App() {
  //below code till return help us to refresh page without losing local storage
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth)

   useEffect(() => {
        if(!auth.authenticated){
            dispatch(isLoggedInUser())
        }    
    
    }, [])
  return (
    <div className="App">
      <Router>
        <PrivateRoute path='/' exact component={HomePage} />
        <Route path='/login' component={LogInPage} />
        <Route path='/signup' component={RegisterPage} />


      </Router>
      
    </div>
  );
}

export default App;
