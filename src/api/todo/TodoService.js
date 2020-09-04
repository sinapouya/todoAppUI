import axios from 'axios';
import {URL} from '../../components/todo/Constants';
class TodoService{
    retriveAllTodos(userName){//todoappservice.herokuapp.com
        return axios.get(`${URL}/users/${userName}/todos`)
    }
    retriveTodo(userName,todoId){
        return axios.get(`${URL}/users/${userName}/todos/${todoId}`)
    }
    deleteTodo(userName,todoId){
        return axios.delete(`${URL}/users/${userName}/todos/${todoId}`);
    }
    updateTodo(userName,todoId,todo){
        return axios.put(`${URL}/users/${userName}/todos/${todoId}`,todo);
    } 
    createTodo(userName,todo){
        return axios.post(`${URL}/users/${userName}/todos`,todo);
    }
}
export default new TodoService();