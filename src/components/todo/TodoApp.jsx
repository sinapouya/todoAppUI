import React,{Component} from 'react';

class TodoApp extends Component{
    render(){
        return (
            <div className="todoApp">
                <LoginComponent></LoginComponent>
            </div>
        );
    }
}

class LoginComponent extends Component{
    render(){
        return (
            <div>
             User name :<input type="text" name="username"/>
             password <input type="password" name="passwoed"/>   
             <button>Loggin</button>
            </div>
        );
    }
}

export default TodoApp;