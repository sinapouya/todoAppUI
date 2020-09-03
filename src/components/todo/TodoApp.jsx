import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import authenticationService from './AuthenticationService.js'
import AuthenticationService from './AuthenticationService.js';
import MessageService from '../../api/todo/MessageService.js'; 
import TodosComponent from '../todo/TodosComponent';
import TodoComponent from '../todo/TodoComponent'; 
class TodoApp extends Component{ 
    render(){
        return (
            <div className="todoApp">
                <Router>
                    <>  
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/todoes/:id" component={TodoComponent}/>
                            <Route path="/todoes" component={TodosComponent}/>
                            <Route path="/logout" component={logOutComponent}/>
                            <Route component={BadUrlPage}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>

            </div>
        );
    }
}
class HeaderComponent extends Component{
    state={
        homeActive:true,
        todoActive:false,
        loginActive:false,
        logoutActive:false
    }
    toggleLink=(event)=>{
        switch (event.target.name) {
            case "home":
                this.setState({homeActive:true,todoActive:false,loginActive:false,logoutActive:false});
                
                break;
            case "todo":
                this.setState({homeActive:false,todoActive:true,loginActive:false,logoutActive:false});
                break;
            case "login":
                this.setState({homeActive:false,todoActive:false,loginActive:true,logoutActive:false});    
                break;
            case "logout":{
                AuthenticationService.logout();
                this.setState({homeActive:false,todoActive:false,loginActive:false,logoutActive:true});
                break;
            }
                
            default:
                this.setState({homeActive:true,todoActive:false,loginActive:false,logoutActive:false});
                break;
        };

    }

    render(){
        return <div>
        <div className="ui pointing menu">
            <Link name="home" to="/"
            onClick={this.toggleLink} className={`item ${this.state.homeActive?"active":"" }`} >Home Page</Link>
            <Link name="todo" to="/todoes"
            onClick={ this.toggleLink} className={`item ${this.state.todoActive?"active":"" }`}>to does</Link>
            
            <div className="right menu">
                <Link name="login" to="/login"
                onClick={this.toggleLink} className={`item ${this.state.loginActive?"active":"" }`}>login</Link>
                <Link name="logout" to="/logout"
                onClick={this.toggleLink} className={`item ${this.state.logoutActive?"active":"" }`}>logout</Link>
            </div>
        </div>
        <h1/>          
    </div>

    }
}
class logOutComponent extends Component{
    render(){
        return  <article>
                    <h1>you are logged out</h1>
                    <div className="container">Thank you for using our application</div>
                </article>
    }
}
class FooterComponent extends Component{
    render(){
        return <footer className="footer">
                <span>All Rights is reserved 2020</span>
        </footer>
    }
}
class BadUrlPage extends Component{
    render(){
        return <div>Bad Url page</div>
    }
}

class WelcomeComponent extends Component{
    state={serverMessage:''}
    executeFromServer = ()=>{
        MessageService.executeGetMessage()
        .then((response)=>this.handleSuccessfulMessage(response))
        .catch(error=>this.handleFailureMessage(error));
        // .finally()
        // this.setState({serverMessage:''});
    }
    handleSuccessfulMessage=(response)=>{
        this.setState({serverMessage:response.data.message})
    }
    handleFailureMessage=(error)=>{
         let errorMessage='';
         if(error.message){
             this.setState({serverMessage:error.message});
         }   
         if(error.message.data){
             this.setState({serverMessage:error.message.data});
         }
    }
    render(){
        return (<article> 
            welcome  {this.props.match.params.name} 
            to manage todoes click <Link to="/todoes" >here</Link><br/>
            <button onClick={this.executeFromServer} className="ui button">get message from api</button>
            <br/>message from api is {this.state.serverMessage}
            </article>);
    }
}

class LoginComponent extends Component{
    constructor(props){
        super(props); 
        this.state={
            username:'',
            password:'',
            showSuccessful:false,
            showFailed:false
        }
    }
    handleChanged=(event)=>{
        console.log(event.target.value);
        this.setState({[event.target.name]:event.target.value});
    }
    loginClicked = ()=>{
        authenticationService.executeJWTAuthenticateService(this.state.username,this.state.password)
        .then((response)=>{
            authenticationService.registerSuccessfulLoginForJWT(this.state.username,response.data.token);
            this.props.history.push(`/welcome/${this.state.username}`);
            this.setState({showSuccessful:true,showFailed:false});
            
        }).catch(()=>{
            this.setState({showSuccessful:false});
            this.setState({showFailed:true});    
            
        });

    }
    showSuccessfulMessage=()=>{
        if(this.state.showSuccessful===true){
            return <div>login successfull</div>;
        }else{
            return <div></div>;
        }
    }
    showFailMessage=()=>{
        if(this.state.showFailed===true){
            return <div>invalid username or password</div>;
        }else{
            return <div></div>;
        }
    }
    render(){
        return (
            
            <div className="mainContent">
                <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                <form className="ui large form">
                    <div className="ui stacked segment">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input type="text" name="username" value={this.state.username}
                             placeholder="user name" onChange={this.handleChanged}></input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" name="password" 
                        onChange={this.handleChanged} value={this.state.password} placeholder="Password"></input>
                        </div>
                    </div>
                        <div className="ui fluid large teal submit button" onClick={this.loginClicked}>
                            Login
                        </div>
                    </div>
            
                    <div className="ui error message" style={{display: this.state.showFailed ?'block':'none'}}>
                        {this.showSuccessfulMessage()}
                        {this.showFailMessage()}
                    </div>
            
                </form>
            
                <div className="ui message">
                    New to us? <a href="#">Sign Up</a>
                </div>
                </div>
          </div>
        </div>
            
        );
    }


}
export default TodoApp;