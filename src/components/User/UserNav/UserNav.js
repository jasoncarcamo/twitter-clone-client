import React from "react";
import "./UserNav.css";
import UserToken from "../../../Services/UserToken/UserToken";

export default class UserNav extends React.Component{

    logOut = () =>{
        UserToken.deleteToken();

        this.props.history.push("/");
    }
    render(){
        return(
            <section id="user-nav">
                <button onClick={this.logOut}>Log out</button>
            </section>
        )
    }
}