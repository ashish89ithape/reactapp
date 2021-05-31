import {Component} from 'react';
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            emailError: '',
            email: ''
        }
    }

    EmailValidate = () => {
        if (!emailPattern.test(this.state.email) ) {
            this.setState({
                emailError: "Please Enter a valid Email ID"
            });
        }
        if(emailPattern.test(this.state.email)){
            this.setState({
                emailError: ""
            });
        }
    }

    changeEmail = (evt) => {
        this.EmailValidate();
        this.setState({
            email: evt.target.value
        });
    }

    validate = (event)=>{
        event.preventDefault()
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.email.value.match(validRegex)) {
            alert("Valid email address!");
            return true;
        } else {
            alert("Invalid email address!");
            return false;
        }
    }

    render(){
        return (
            <div className="container text-left" style={{"marginTop":"10px"}}>
                <div className="row">
                    <div className="col-md-12">
                    <form>
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <label>Username</label>
                                <input type="text" className="form-control" name="name" placeholder="Enter Your name"></input>
                                <label>Email</label>
                                <input type="text" className="signup form-control" name="email" value={this.state.email} onChange={this.changeEmail} placeholder="Email"></input>
                                <p className="help-block help-block-error" style={{color:"red"}}>{this.state.emailError}</p>
                                <label>Password</label>
                                <input type="password" className="form-control" name="pwd" placeholder="Enter Your Password"></input>
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" name="pwd" placeholder="Enter Your Confirm Password"></input>
                                <br></br>
                                <button onClick={this.validate} className="btn btn-success" type="button">Submit</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;