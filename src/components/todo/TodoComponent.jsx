import React,{Component} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
class TodoComponent extends Component{
    constructor(props){
        super(props);
        console.log(this);
        this.state = {
            id:this.props.match.params.id,        
            description:'description initial value',
            targetDate:moment(new Date()).format('YYYY-MM-DD')
        }
    }
    submitForm =(values)=>{
         console.log(values);   
    }
    validate =(values)=>{
        let errors = {};
        if(!values.description){
            errors.description='Please Enter a description value'
        }else if(values.description.length<5){
            errors.description='Please Enter at least 5 characters for description'
        }
        console.log('check date by moment');
        console.log(values.targetDate);
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
                validateOnChange={false}                >
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