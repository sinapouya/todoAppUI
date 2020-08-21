import axios from 'axios';
class AuthenticationService{
    registerSuccessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser',username);
        this.setupAxiosInterceptor();
    }
    getLoggedInUserName(){
        return sessionStorage.getItem('authenticatedUser');
    }
    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }
    setupAxiosInterceptor(){
        let userName = 'sina';
        let password = 'pass';
        let basicAuthHeader = 'Basic '+ window.btoa( userName+':'+password);
        
        axios.interceptors.request.use(
            (config)=>{
                if(this.getLoggedInUserName){
                    config.headers.authorization = basicAuthHeader;
                } 
                return config;
            }
            
        )
    }
}
export default new AuthenticationService();