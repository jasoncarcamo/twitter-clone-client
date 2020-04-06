import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {Switch, Route} from "react-router-dom";

//Routes
import LandingPage from  "../LandingPage/LandingPage";
import Register from "../Register/Register";
import Login from "../Login/Login";
import User from "../User/User";
import NotFound from "../NotFound/NotFound";

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route path="/:user" component={User}/>
                
                //This displays error 404 page not found 
                <Route component={NotFound}/>
            </Switch>
        </>
    )
}

export default App;
