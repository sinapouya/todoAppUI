import React,{Component} from 'react';
import { Formik, Field, Form } from 'formik';
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
    render(){
        let {id,description,targetDate} = this.state;
    return <div className="mainContent">
        
        <Formik initialValues={{description:description,
                                targetDate:targetDate}}
                onSubmit={this.submitForm}                >
            {
                (props) => (
                    <Form className="formClass ui form" style={{border: 'antiquewhite'}}>
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