import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import {Route} from "react-router-dom";

//Routes
import Login from "../Login/Login";

function App() {
    return (
        <>
        
            <Route exact path="/login" component={Login}/>
        </>
    )
}

export default App;
