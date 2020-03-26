const UserToken = {
    saveToken(token){
        window.localStorage.setItem("twitter-clone-user", token);
    },
    deleteToken(){
        window.localStorage.removeItem("twitter-clone-user");
    },
    getToken(){
        return window.localStorage.getItem("twitter-clone-user");
    },
    hasToken(){
        return UserToken.getToken();
    }
};

module.exports = UserToken;