import React,{Component} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import moment from 'moment';
import todoService from '../../api/todo/TodoService.js';
import authenticationService from '../../components/todo/AuthenticationService.js';
import { Button } from 'semantic-ui-react';

class TodoComponent extends Component{
    componentDidMount(){
        let userName = authenticationService.getLoggedInUserName();
        if(this.state.id===-1){
            return;
        }else{
            todoService.retriveTodo(userName,this.state.id)
            .then(response =>{
                let {id,description,targetDate}=response.data;
                this.setState({
                    id:id,
                    description:description,
                    targetDate:moment(targetDate).format('YYYY-MM-DD')
                });
            })
        }
        
        
    }
    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,        
            description:'',
            targetDate:moment(new Date()).format('YYYY-MM-DD')
        }
    }
    submitForm =(values)=>{
        let userName = authenticationService.getLoggedInUserName();
        
        if(this.state.id==-1){
            todoService.createTodo(userName,{
                id: -1,
                userName:userName,
                description:values.description,
                targetDate:values.targetDate
            }).then(()=>{
                this.props.history.push(`/todoes`);
            });
        }else{
            todoService.updateTodo(userName,this.state.id,{
                id: this.state.id,
                userName:userName,
                description:values.description,
                targetDate:values.targetDate
            }).then(()=>{
                this.props.history.push(`/todoes`);
            });
        } 
         
    }
    validate =(values)=>{
        let errors = {};
        if(!values.description){
            errors.description='Please Enter a description value'
        }else if(values.description.length<5){
            errors.description='Please Enter at least 5 characters for description'
        }
        let momentTargetDate= moment(values.targetDate);
        
        if(!momentTargetDate.isValid()){
            errors.targetDate='Please Enter a valid target date';    
        }
        return errors;
    }
    render(){
        let {id,description,targetDate} = this.state;
     return <div className="mainContent">
        
        <Formik initialValues={{description:description,
                                targetDate:targetDate}}
                onSubmit={this.submitForm}
                validate={this.validate}
                validateOnBlur={false}
                validateOnChange={false}
                enableReinitialize={true}                >
            {
                (props) => (
                    <Form className="formClass ui form" style={{border: 'antiquewhite'}}>
                        <ErrorMessage name="description" component="div" 
                            className="ui error message" style={{display:'block'}}/>
                        <ErrorMessage name="targetDate" component="div" 
                            className="ui error message" style={{display:'block'}}/>
                                        
                        <fieldset> 
                            <div className="field">
                                <label>description</label>
                                <Field type="text" name="description"></Field>
                            </div>
                            <div className="field">
                                <label>target Date</label>
                                <Field type="date" name="targetDate"></Field>
                            </div>
                            <div>
                                <button className="ui button" type="submit">Save</button>    
                            </div>
                            
                        </fieldset>    
                    </Form>
                    
                )
                    
            }
                        
        </Formik>
    </div>
    };
}
export default TodoComponent; 