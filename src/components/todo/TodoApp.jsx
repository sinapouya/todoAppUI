import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
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
                            <Route path="/todoes" component={TodoesComponent}/>
                            <Route component={BadUrlPage}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>

            </div>
        );
    }
}
class TodoesComponent extends Component{
    constructor(){
        super();
        this.state={
            todoes:[
                {id:1,description:'learn react',done:false,targetDate:new Date()},
                {id:2,description:'learn bootstrap',done:false,targetDate:new Date()},
                {id:3,description:'learn programming',done:false,targetDate:new Date()}
            ]
        }        
    }
    render(){
        return <div>
            <table>
                <thead>
                    <th>id</th>
                    <th>description</th>
                    <th>done</th>
                    <th>target date</th>
                </thead>
                <tbody>
                        {
                            this.state.todoes.map(item=>{
                                    return  <tr>
                                                <td>{item.id}</td>
                                                <td>{item.description}</td>
                                                <td>{item.done.toString()}</td>
                                                <td>{item.targetDate.toString()}</td>
                                            </tr>
                                    }
                             )
                        }
                </tbody>
                
            </table>
            </div>
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
            case "logout":
                this.setState({homeActive:false,todoActive:false,loginActive:false,logoutActive:true});
                break;
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
            onClick={this.toggleLink} className={`item ${this.state.todoActive?"active":"" }`}>to does</Link>
            
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
class FooterComponent extends Component{
    render(){
        return <div>
                    <h1/>footer
                </div>
    }
}
class BadUrlPage extends Component{
    render(){
        return <div>Bad Url page</div>
    }
}

class WelcomeComponent extends Component{
    render(){
        return (<div> 
            welcome {this.props.match.params.name} 
            to manage todoes click <Link to="/todoes" >here</Link>
            </div>);
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
            this.props.history.push(`/welcome/${this.state.username}`);
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