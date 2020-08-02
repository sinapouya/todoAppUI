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
    constructor(props){
        super(props);
        this.state={
            username:'type a user name',
            password:''
        }
    }
    handleChanged=(event)=>{
        console.log(event.target.value);
        this.setState({[event.target.name]:event.target.value});
    }
    
    render(){
        return (
            <div>
             User name :<input type="text" name="username" value={this.state.username} onChange={this.handleChanged}/>
             password <input type="password" name="password" value={this.state.password} onChange={this.handleChanged}/>   
             <button>Loggin</button>
            </div>
        );
    }
}

export default TodoApp;