import React,{Component} from 'react';
import TodoService from '../../api/todo/TodoService.js'
import AthenticationService from '../todo/AuthenticationService.js'; 
class TodosComponent extends Component{
    componentDidMount(){
        let userName = AthenticationService.getLoggedInUserName();
        TodoService.retriveAllTodos(userName)
        .then(response=>{this.setState({todoes:response.data});});
    }
    constructor(){
        super();
        this.state={
            todoes:[
                // {id:1,description:'learn react',done:false,targetDate:new Date()},
                // {id:2,description:'learn bootstrap',done:false,targetDate:new Date()},
                // {id:3,description:'learn programming',done:false,targetDate:new Date()}
            ]
        }        
    }
    render(){
        return <article>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>description</th>
                        <th>done</th>
                        <th>target date</th>
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
                                            </tr>
                                    }
                             )
                        }
                </tbody>
                
            </table>
            </article>
    }
}
export default TodosComponent;