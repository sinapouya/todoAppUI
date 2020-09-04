import React,{Component} from 'react';
import authenticationService from './AuthenticationService.js'

class LogInComponent extends Component{
    constructor(props){
        super(props); 
        this.state={
            username:'',
            password:'',
            showSuccessful:false,
            showFailed:false
        }
    }
    handleChanged=(event)=>{
        console.log(event.target.value);
        this.setState({[event.target.name]:event.target.value});
    }
    loginClicked = ()=>{
        authenticationService.executeJWTAuthenticateService(this.state.username,this.state.password)
        .then((response)=>{
            authenticationService.registerSuccessfulLoginForJWT(this.state.username,response.data.token);
            this.props.history.push(`/welcome/${this.state.username}`);
            this.setState({showSuccessful:true,showFailed:false});
            
        }).catch(()=>{
            this.setState({showSuccessful:false});
            this.setState({showFailed:true});    
            
        });

    }
    showSuccessfulMessage=()=>{
        if(this.state.showSuccessful===true){
            return <div>login successfull</div>;
        }else{
            return <div></div>;
        }
    }
    showFailMessage=()=>{
        if(this.state.showFailed===true){
            return <div>invalid username or password</div>;
        }else{
            return <div></div>;
        }
    }
    render(){
        return (
            
            <div className="mainContent">
                <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui teal image header">
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                <form className="ui large form">
                    <div className="ui stacked segment">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input type="text" name="username" value={this.state.username}
                             placeholder="user name" onChange={this.handleChanged}></input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" name="password" 
                        onChange={this.handleChanged} value={this.state.password} placeholder="Password"></input>
                        </div>
                    </div>
                        <div className="ui fluid large teal submit button" onClick={this.loginClicked}>
                            Login
                        </div>
                    </div>
            
                    <div className="ui error message" style={{display: this.state.showFailed ?'block':'none'}}>
                        {this.showSuccessfulMessage()}
                        {this.showFailMessage()}
                    </div>
            
                </form>
            
                <div className="ui message">
                    New to us? <a href="#">Sign Up</a>
                </div>
                </div>
          </div>
        </div>
            
        );
    }


}
export default LogInComponent; 