import React from "react";
import UserToken from "../../../Services/UserToken/UserToken";
import UserContext from "../../Contexts/UserContext/UserContex";

export default class UnfollowButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: ""
        };
    };

    static contextType = UserContext;

    unfollow = ()=>{
        fetch(`https://twitterclonecs20200402030233.azurewebsites.net/api/follows/${this.props.userId}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${UserToken.getToken()}`
            }
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
        return <button onClick={this.unfollow}>Unfollow</button>
    }
}