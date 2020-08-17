import React,{Component} from 'react';
import { Formik, Field, Form } from 'formik';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
class TodoComponent extends Component{
    constructor(){
        super();
        this.state = {
            id:22,
            description:'description',
            targetDate:moment(new Date()).format('YYYY-MM-DD')
        }
    }
    render(){
    return <div className="mainContent">
        {/* id is {this.props.match.params.id} */}
        <Formik >
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
                                <button class="ui button" type="submit">Save</button>    
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