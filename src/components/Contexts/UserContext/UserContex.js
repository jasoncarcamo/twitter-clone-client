import React from "react";
import UserToken from "../../../Services/UserToken/UserToken";

const UserContext = React.createContext({
    user: {},
    follows: [],
    userLoggedIn: ()=>{},
    refreshUserContext: ()=>{}
})

export default UserContext;

export class UserProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            follows: []
        };
    };

    componentDidMount(){
        if(UserToken.hasToken()){
            this.logIn();
        }
    }

    logIn = ()=>{

        fetch(`https://twitterclonecs20200402030233.azurewebsites.net/api/users`, {
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
                

                fetch(`https://twitterclonecs20200402030233.azurewebsites.net/api/follows/${resData.user.id}`, {
                    headers: {
                        'content-type': "application/json",
                    }
                })
                    .then( followRes => {
                        if(!followRes.ok){
                            return followRes.json().then( e => Promise.reject(e));
                        };

                        return followRes.json();
                    })
                    .then( followData => {
                        this.setState({
                            user: resData.user,
                            follows: followData.follows
                        });
                    })
                    .catch( followErr => this.setState({ error: followErr.error}))
            })
            .catch( err => this.setState({error: err}));
    }

    refreshUserContext = ()=>{
        console.log("Refreshing")
        this.componentDidMount();
    }
    
    render(){
        console.log(this.state);
        const value = {
            user: this.state.user,
            follows: this.state.follows,
            userLoggedIn: this.userLoggedIn,
            refreshUserContext: this.refreshUserContext
        };
        
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}