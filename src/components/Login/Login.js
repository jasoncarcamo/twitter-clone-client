import React from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    };

    handleInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleForm = (e)=>{
        e.preventDefault();

        fetch("https://quiet-fjord-72381.herokuapp.com/api/login", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then( res => {
                if(!res.ok){

                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData);
            })
            .catch( err => this.setState({ error: err.error}));
    }

    render(){
        console.log(this.state);
        return (
            <section id="login-section">
                <form id="login-form" onSubmit={this.handleForm}>
                    <fieldset id="login-fieldset">
                        <legend></legend>

                        <label htmlFor="login-email">Email:</label>
                        <input 
                            id="login-email" 
                            type="email" 
                            name="email"
                            onChange={this.handleInput}
                            value={this.state.email}
                            required/> 

                        <label htmlFor="login-password">Password:</label>
                        <input 
                            id="login-password" 
                            type="password" 
                            name="password"
                            onChange={this.handleInput}
                            value={this.state.password}
                            required/> 

                        <button id="login-submit" type="submit">Log In</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}