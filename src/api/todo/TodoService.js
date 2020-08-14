import axios from 'axios';
class TodoService{
    retriveAllTodos(userName){
        return axios.get(`https://todoappservice.herokuapp.com/users/${userName}/todos`)
    }
}
export default new TodoService();