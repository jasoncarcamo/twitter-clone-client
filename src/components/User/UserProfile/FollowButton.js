import React from "react";
import UserToken from "../../../Services/UserToken/UserToken";
import UserContext from "../../Contexts/UserContext/UserContex";

export default class FollowButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: ""
        };
    };

    static contextType = UserContext;

    follow = ()=>{
        fetch(`https://twitterclonecs20200402030233.azurewebsites.net/api/follows`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${UserToken.getToken()}`
            },
            body: JSON.stringify({
                follows: this.props.userId
            })
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                this.context.refreshUserContext();
            })
            .catch( err => this.setState({ error: err.error}));
    }

    render(){
        console.log(this.state);
        return <button onClick={this.follow}>Follow</button>
    }
}