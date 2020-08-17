import React,{Component} from 'react';
class TodoComponent extends Component{
    render(){
    return <div>todo component to edit todo id is {this.props.match.params.id}</div>
    };
}
export default TodoComponent; 