import axios from "axios";
import {URL} from '../../components/todo/Constants';
class MessageService{
    executeGetMessage(){
        //console.log('executeGetMessage');
        return axios.get(`${URL}/todo/v1.0.1/sayHello`);
        

    }
}
export default new MessageService();