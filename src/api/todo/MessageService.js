import axios from "axios";

class MessageService{
    executeGetMessage(){
        //console.log('executeGetMessage');
        return axios.get("https://todoappservice.herokuapp.com/todo/v1.0.1/sayHello");
        
    }
}
export default new MessageService();