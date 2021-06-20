import {Component} from 'react';
import axios from "axios";
class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            errors: {},
            input:  {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({
          input
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validate()){
            console.log(this.state);
            const url =  process.env.REACT_APP_BASE_API_URL+"/register"
            const loginData = { email:this.state.input.email,name:this.state.input.name, password:this.state.input.password }
            axios.post(url, loginData)
            .then(response =>  {

                    if(response.data.message) {
                            if (response.data.message === 'User Registered') {
                                alert("Thank you for Registered, Verification link has been sent to your Registered Email Id. Please Verified Registered Email Id before Sign In")
                            } else {
                                alert(response.data.message);
                            }
                    }else{
                        localStorage.setItem('name',response.data.name);
                        localStorage.setItem('loggedin',true);
                        this.props.history.push("/")
                    }
                }
            );

        }
    }

    validate(){
        let input   = this.state.input;
        let errors  = {};
        let isValid = true;

        if (input["password"] && input["confirmpassword"] && input["password"] !== input["confirmpassword"]) {
            isValid = false;
            errors["error"] = "Confirm Password is not match with Password";
        }

        if (typeof input["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
              isValid = false;
              errors["error"] = "Please enter valid email address.";
            }
        }
        if (!input["password"] || !input["email"] || !input["name"] || !input["confirmpassword"]) {
            isValid = false;
            errors["error"] = "Please enter values";
        }

        this.setState({
          errors: errors
        });
        return isValid;
    }

     render(){
         return(
            <div className="container">
                <h2 className="card-title text-center">Sign Up</h2>
                <div className="row justify-content-center">
                    <div className="card" style={{width:400}}>
                        <form className="mt-3"  onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Enter Name</label>
                            <input type="text" name="name" value={this.state.input.name} onChange={this.handleChange} className="form-control"
                            placeholder="Enter name" id="name" />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" name="email" value={this.state.input.email} onChange={this.handleChange} className="form-control"
                            placeholder="Enter email" id="email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.input.password} onChange={this.handleChange} className="form-control"
                            placeholder="Enter Password" id="password" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmpassword" value={this.state.input.confirmPassword} onChange={this.handleChange} className="form-control"
                            placeholder="Enter Confirm Password" id="confirmpassword" />
                        </div>
                        <div className="text-danger">{this.state.errors.error && this.state.errors.error }</div>
                        <input type="submit" value="Signup" className="btn btn-success" />
                        </form>
                    </div>
                </div>
            </div>
         )
     }
}

export default Signup;