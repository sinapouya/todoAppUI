import axios from 'axios';
class TodoService{
    retriveAllTodos(userName){//todoappservice.herokuapp.com
        return axios.get(`http://localhost:8080/users/${userName}/todos`)
    }
    retriveTodo(userName,todoId){
        return axios.get(`http://localhost:8080/users/${userName}/todos/${todoId}`)
    }
    deleteTodo(userName,todoId){
        return axios.delete(`http://localhost:8080/users/${userName}/todos/${todoId}`);
    }
    updateTodo(userName,todoId,todo){
        return axios.put(`http://localhost:8080/users/${userName}/todos/${todoId}`,todo);
    } 
    createTodo(userName,todo){
        return axios.post(`http://localhost:8080/users/${userName}/todos`,todo);
    }
}
export default new TodoService();