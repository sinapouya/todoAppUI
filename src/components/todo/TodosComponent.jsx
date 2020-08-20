import React,{Component} from 'react';
import TodoService from '../../api/todo/TodoService.js'
import AuthenticationService from '../todo/AuthenticationService.js';
 
import { Button } from 'semantic-ui-react';
class TodosComponent extends Component{
    componentDidMount(){
        this.retriveAllTodos();        
    }
    deleteTodo=(todoId)=>{
        let userName = AuthenticationService.getLoggedInUserName();
        TodoService.deleteTodo(userName,todoId)
        .then(()=>{
            this.setState({message:'delete successfully'})
        }).finally(()=>{
            this.retriveAllTodos();
        });
    }
    insertTodo(){
        let userName = AuthenticationService.getLoggedInUserName();

        this.props.history.push(`/todoes/-1`);
    }
    updateTodo = (todoId)=>{
        let userName = AuthenticationService.getLoggedInUserName();
        console.log('update'+' user '+userName+' id '+todoId);
        this.props.history.push(`/todoes/${todoId}`);

    }
    retriveAllTodos(){
        let userName = AuthenticationService.getLoggedInUserName();
        TodoService.retriveAllTodos(userName)
        .then(response=>{this.setState({todoes:response.data});});
    }
    constructor(){
        super();
        this.state={
            todoes:[],
            message:null
        }        
    }
    render(){
        return <article>
            { this.state.message &&<div className="ui success message">
                <div className="content">
                    <div className="header">operation done successfully</div>
                    <p>{this.state.message}</p>
                </div>
            </div>
            }

            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>done</th>
                        <th>target date</th>
                        <th>update</th>
                        <th>delete</th>
                    </tr>    
                </thead>
                <tbody>
                        {
                            this.state.todoes.map(item=>{
                                    return  <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.description}</td>
                                                <td>{item.done.toString()}</td>
                                                <td>{item.targetDate.toString()}</td>
                                                <td><Button 
                                                onClick={()=>{this.updateTodo(item.id)}}
                                                className="positive ui button">update</Button></td>
                                                <td><Button 
                                                onClick={()=>{this.deleteTodo(item.id)}}
                                                className="negative ui button">delete</Button></td>
                                            </tr>
                                    }
                             )
                        }
                </tbody>
                
            </table>
            <Button  onClick={()=>{this.insertTodo()}}
                     className="positive ui button">add </Button>

            </article>
    }
}
export default TodosComponent;