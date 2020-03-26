import React from "react";
import "./LandingPage.css";
import UserToken from "../../Services/UserToken/UserToken";

export default class LandingPage extends React.Component{
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
                UserToken.saveToken(resData.token);
            })
            .catch( err => this.setState({ error: err.error}));
    }

    render(){
        return (
            <section id="landing-page-section">
                <section>
                    <p>Follow your interests.</p>
                    <p>Hear what people are talking about.</p>
                    <p>Join the conversion.</p>
                </section>

                <section>

                    <form onSubmit={this.handleForm}>
                        <fieldset>
                            <legend></legend>

                            <label htmlFor="landing-page-email">Email:</label>
                            <input 
                                id="landing-page-email"
                                type="email"
                                name="email"
                                onChange={this.handleInput}
                                value={this.state.email}/>

                            <label htmlFor="landing-page-password">Password:</label>
                            <input 
                                id="landing-page-password"
                                type="password"
                                name="password"
                                onChange={this.handleInput}
                                value={this.state.password}/>

                            <button type="submit">Log in</button>
                        </fieldset>

                        {this.state.error ? <p>{this.state.error}</p> : ""}

                    </form>

                    <section>
                        <h2><strong>See what's happening in the world right now</strong></h2>

                        <section>
                            <p>Join the twiiter world</p>
                            <button>Sign up</button>
                            <button>Log in</button>
                        </section>

                    </section>

                </section>
            </section>
        )
    }
}