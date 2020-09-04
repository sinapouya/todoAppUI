import axios from 'axios';
import {URL} from '../../components/todo/Constants'
class AuthenticationService{
    registerSuccessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser',username);
        this.setupAxiosInterceptor(this.createToken(username,password));
    }
    registerSuccessfulLoginForJWT(username,token){
        sessionStorage.setItem('authenticatedUser',username);
        this.setupAxiosInterceptor(this.createJWTToken(token));
    }
    getLoggedInUserName(){
        return sessionStorage.getItem('authenticatedUser');
    }
    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }
    executeAuthService(username,password){
        return axios.get(`${URL}/basicAuth`,
        {headers:{authorization:this.createToken(username,password)}}
        );
    }
    executeJWTAuthenticateService(username,password){
        return axios.post(`${URL}/authenticate`,{
            username,
            password
        });
    }
    createToken(username,password){
        return 'Basic '+ window.btoa( username+':'+password);
    }
    createJWTToken(token){
        return 'Bearer '+ token;
    }
    setupAxiosInterceptor(token){
        axios.interceptors.request.use(
            (config)=>{
                if(this.getLoggedInUserName){
                    config.headers.authorization = token;
                } 
                return config;
            }
            
        );
    }
}
export default new AuthenticationService();