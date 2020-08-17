import axios from 'axios';
class TodoService{
    retriveAllTodos(userName){
        return axios.get(`http://todoappservice.herokuapp.com/users/${userName}/todos`)
    }
    deleteTodo(userName,todoId){
        return axios.delete(`https://todoappservice.herokuapp.com/users/${userName}/todos/${todoId}`);
    }
    updateTodo(userName,todoId){
        return axios.put(`https://todoappservice.herokuapp.com/users/${userName}/todos/${todoId}`);
    }}
export default new TodoService();