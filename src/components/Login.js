import {Component} from "react"
import axios from "axios";

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            errors: {},
            input: {}
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
            const url =  process.env.REACT_APP_BASE_API_URL+"/login"
            const loginData = { email:this.state.input.email, password:this.state.input.password }
            axios.post(url, loginData)
            .then(response =>  {
                this.setState({
                    errors: {},
                    input: {}
                });
                //console.log(response.data);
                    if(response.data.message) {
                        alert(response.data.message)
                    }else{
                        localStorage.setItem('name',response.data.name)
                        localStorage.setItem('loggedin',true)
                        localStorage.setItem('token',response.data.token)
                        this.props.history.push("/")
                    }
                }
            );

        }
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        if (typeof input["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
              isValid = false;
              errors["email"] = "Please enter valid email address.";
            }
        }
        if (!input["password"] || !input["email"]) {
            isValid = false;
            errors["email"] = "Please enter values";
        }

        this.setState({
          errors: errors
        });
        return isValid;
    }

     render(){
         return(
            <div className="container">
                <h2 className="card-title text-center">Sign In</h2><br/>
                <div className="row justify-content-center">
                    <div style={{width:400}}>
                        <form className="container mt-3"  onSubmit={this.handleSubmit}>
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
                        <div className="text-danger">{this.state.errors.email && this.state.errors.email }
                            {this.state.errors.password && this.state.errors.password }</div>
                        <input type="submit" value="Sign In" className="btn btn-success" />
                        </form>
                    </div>
                </div>
            </div>
         )
     }
}

export default Login