import React from "react";
import "./Register.css";
import UserToken from "../../Services/UserToken/UserToken";

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            screenname: "",
            password: "",
            confirmpassword: "",
            error: ""
        };
    };

    handleInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleForm = (e)=>{
        e.preventDefault();

        fetch("https://quiet-fjord-72381.herokuapp.com/api/register", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                name: `${this.state.firstname} ${this.state.lastname}`,
                email: this.state.email,
                screen_name: this.state.screenname,
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
                UserToken.saveToken(resData.token);
            })
            .catch( err => this.setState({ error: err.error}));
    }
    
    render(){

        console.log(this.state);

        return (
            <section id="register-section">
                <form id="register-form" onSubmit={this.handleForm}>
                    <fieldset id="register-fieldset">
                        <legend></legend>

                        <label htmlFor="register-firstname">First name:</label>
                        <input 
                            id="register-firstname" 
                            type="text" 
                            name="firstname"
                            onChange={this.handleInput}
                            value={this.state.firstname}/>

                        <label htmlFor="register-lastname"></label>
                        <input 
                            id="register-lastname" 
                            type="text" 
                            name="lastname"
                            onChange={this.handleInput}
                            value={this.state.lastname}/>

                        <label htmlFor="register-email">Email:</label>
                        <input 
                            id="register-email" 
                            type="email" 
                            name="email"
                            onChange={this.handleInput}
                            value={this.state.email}/>

                        <label htmlFor="register-screenname">Screen name:</label>
                        <input 
                            id="register-screenname" 
                            type="text"
                            name="screenname"
                            onChange={this.handleInput}
                            value={this.state.input}/>

                        <label htmlFor="register-password">Password:</label>
                        <input 
                            id="register-password" 
                            type="password" 
                            name="password"
                            onChange={this.handleInput}
                            value={this.state.password}/>

                        <label htmlFor="register-confirmpassword">Retype password:</label>
                        <input 
                            id="register-confirmpassword" 
                            type="password" 
                            name="confirmpassword"
                            onChange={this.handleInput}
                            value={this.state.confirmpassword}/>

                            {this.state.error ? <p>{this.state.error}</p> : ""}

                        <button type="submit">Register</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}