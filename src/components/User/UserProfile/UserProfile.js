import React from "react";
import "./UserProfile.css";
import UserToken from "../../../Services/UserToken/UserToken";
import UserContext from "../../Contexts/UserContext/UserContex";
import FollowButton from "./FollowButton";
import UnFollowButton from "./UnfollowButon";

export default class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            screen_name: "",
            userFound: false,
            user: {},
            currentProfile: false,
            followsUser: false
        };
    };

    static contextType = UserContext;

    componentDidMount(){
        this.getUser();
    }

    getUser = ()=>{
        const screen_name = this.props.match.params.user;

        fetch(`https://twitterclonecs20200402030233.azurewebsites.net/api/users/${screen_name}`, {
            headers: {
                'content-type': "application/json"
            }
        })
            .then( res => {
                if(!res.ok){
                    
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData.user.id, this.context.user.id);
                this.setState({
                    userFound: true,
                    user: resData.user,
                    currentProfile: true
                })
            })
            .catch( err => this.setState({userFound: false}));
    }

    noUserFound = ()=>{
        return (
            <>
                <section>
                    <section>

                    </section>
                    <img alt="User icon"/>

                    <section>
                        <p>@{this.state.screen_name}</p>
                    </section>
                </section>

                <section>
                    <p>
                        <strong>This account doesn't exist</strong>
                    </p>

                    <p>Try searching for another one.</p>
                </section>
            </>
        );
    }

    isFollowingUser = ()=>{
        if(this.state.currentProfile){
            const follows = this.context.follows;
            let doesFollow = follows.filter( user => user.user_id === this.context.user.id && user.follows === this.state.user.id);
            console.log(follows)
            if(doesFollow.length > 0){
                console.log(doesFollow);
                return true;
            };

            return false;
        }

        return false;
    }

    userFound = ()=>{
        return (
            <>
                <section>
                    <section>

                    </section>

                    <section>
                        <img alt="User icon"/>
                    </section>

                    {this.state.user.id === this.context.user.id ? <button>Edit Profile</button> : this.isFollowingUser() === true ? <UnFollowButton userId={this.state.user.id}/> :
                    <FollowButton userId={this.state.user.id}/>}

                    <section>
                        <p>@{this.state.screen_name}</p>
                        <p>Joined {new Date(this.state.user.dateCreated).toDateString()}</p>
                    </section>

                    <section>
                        <p><strong></strong>Following</p>
                        <p><strong></strong>Followers</p>
                    </section>
                </section>

                <section>
                    User found
                </section>
            </>
        )
    }

    render(){
        console.log(this.isFollowingUser())
        return (
            <section>
                {this.state.userFound ? this.userFound() : this.noUserFound()}
            </section>
        );
    };
};