import React from "react";
import "./User.css";
import {Route, Switch} from "react-router-dom";
import UserToken from "../../Services/UserToken/UserToken";

import UserNav from "./UserNav/UserNav";
import Home from "./Home/Home";
import UserProfile from "./UserProfile/UserProfile";
import NotFound from "../NotFound/NotFound";

export default class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    componentDidMount(){
    }

    render(){

        return (
            <section id="user-section">
                {UserToken.hasToken() ? <Route path="/" component={UserNav}/> : ""}
                <Switch>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/:user" component={UserProfile}/>
                    //This displays error 404 page not found 
                    <Route component={NotFound}/>
                </Switch>
            </section>
        )
    }
}