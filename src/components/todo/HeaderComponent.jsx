import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';

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
export default HeaderComponent; 