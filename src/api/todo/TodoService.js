import axios from 'axios';
class TodoService{
    retriveAllTodos(userName){//todoappservice.herokuapp.com
        return axios.get(`https://todoappservice.herokuapp.com/users/${userName}/todos`)
    }
    retriveTodo(userName,todoId){
        return axios.get(`https://todoappservice.herokuapp.com/users/${userName}/todos/${todoId}`)
    }
    deleteTodo(userName,todoId){
        return axios.delete(`https://todoappservice.herokuapp.com/users/${userName}/todos/${todoId}`);
    }
    updateTodo(userName,todoId,todo){
        return axios.put(`https://todoappservice.herokuapp.com/users/${userName}/todos/${todoId}`,todo);
    } 
    createTodo(userName,todo){
        return axios.post(`https://todoappservice.herokuapp.com/users/${userName}/todos`,todo);
    }
}
export default new TodoService();