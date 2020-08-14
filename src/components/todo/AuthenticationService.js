class AuthenticationService{
    registerSuccessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser',username);
    }
    getLoggedInUserName(){
        return sessionStorage.getItem('authenticatedUser');
    }
    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }
}
export default new AuthenticationService();