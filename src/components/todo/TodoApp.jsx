import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
class TodoApp extends Component{ 
    render(){
        return (
            <div className="todoApp">
                <Router>
                    <>  
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/todoes" component={TodoesComponent}/>
                            <Route component={BadUrlPage}/>
                        </Switch>
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
                {id:1,description:'learn react'},
                {id:2,description:'learn bootstrap'},
                {id:3,description:'learn programming'}
            ]
        }        
    }
    render(){
        return <div>
            <table>
                <thead>
                    <th>id</th>
                    <th>description</th>
                </thead>
                <tbody>
                        {
                            this.state.todoes.map(item=>{
                                    return  <tr>
                                                <td>{item.id}</td>
                                                <td>{item.description}</td>
                                            </tr>
                                    }
                             )
                        }
                </tbody>
                
            </table>
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
        return (<div> welcome {this.props.match.params.name} </div>);
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