import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { HeaderBlock } from '../components'
import NotFound from '../components/NotFound/index'
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";

import 'bootstrap/dist/css/bootstrap.min.css'
import { PlansList, PlanInsert, PlanUpdate, Login, Register } from '../pages'
import PrivateRoute from "../components/privateRoute/privateRoute";
import { Provider } from "react-redux";
import store from "../store";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());    // Redirect to login
      window.location.href = "./login";
    }
  } 
function App() {
    return (
        <Provider store={store}>
            <div className="wrapper">            
                <Router>
                    <HeaderBlock/>
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute path="/plan/list" exact component={PlansList} />
                        <PrivateRoute path="/plan/create" exact component={PlanInsert} />
                        <PrivateRoute path="/plan/update/:id" exact component={PlanUpdate}/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Router>
            </div>
        </Provider>
    )
}

export default App
