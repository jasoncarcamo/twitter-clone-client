import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {Switch, Route} from "react-router-dom";

//Routes
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                
                //This displays error 404 page not found 
                <Route component={NotFound}/>
            </Switch>
        </>
    )
}

export default App;
