import React from "react";
import "./Login.css";

export default class Login extends React.Component{
    render(){
        return (
            <section id="login-section">
                <form>
                    <fieldset>
                        <legend></legend>

                        <label htmlFor="login-email">Email:</label>
                        <input id="login-email" type="email" required/> 

                        <label htmlFor="login-password">Password:</label>
                        <input id="login-password" type="password" required/> 

                        <button id="login-submit" type="submit">Log In</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}