import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import MessageService from '../../api/todo/MessageService.js'; 
import TodosComponent from '../todo/TodosComponent';
import TodoComponent from '../todo/TodoComponent'; 
import HeaderComponent from '../todo/HeaderComponent';
import LogOutComponent from '../todo/LogOutComponent';
import LogInComponent from '../todo/LogInComponent';
import FooterComponent from '../todo/FooterComponent';
class TodoApp extends Component{ 
    render(){
        return (
            <div className="todoApp">
                <Router>
                    <>  
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LogInComponent}/>
                            <Route path="/login" component={LogInComponent}/>
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/todoes/:id" component={TodoComponent}/>
                            <Route path="/todoes" component={TodosComponent}/>
                            <Route path="/logout" component={LogOutComponent}/>
                            <Route component={BadUrlPage}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>

            </div>
        );
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


export default TodoApp;