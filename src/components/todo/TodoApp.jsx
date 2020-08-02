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
        if(this.state.username==='sina' && this.state.password==='pass' ){
            this.setState({showSuccessful:true});
            this.setState({showFailed:false});
            console.log('login successful');
        }else{
            this.setState({showSuccessful:false});
            this.setState({showFailed:true});    
            console.log('login failed');
        }
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
            return <div>login fail</div>;
        }else{
            return <div></div>;
        }
    }
    render(){
        return (
            <div>
                {this.showSuccessfulMessage()}
                {this.showFailMessage()}
                
                User name :<input type="text" name="username" value={this.state.username}
                 onChange={this.handleChanged}/>
                password <input type="password" name="password" value={this.state.password}
                 onChange={this.handleChanged}/>   
                <button onClick={this.loginClicked}>Loggin</button>
            </div>
        );
    }


}
export default TodoApp;