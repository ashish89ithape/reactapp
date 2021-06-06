import Navbar from './components/Navbar'
import Signup from "./components/Signup"
import Login from './components/Login'
import {BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import Home from "./Home"
import './App.css';
import Pagenotfound from "./Pagenotfound"
import Search from "./components/Search"
import Cakedetails from "./components/Cakedetails"
import { useState } from 'react'

var details = {
  projectname : "CakeShop",
  logo:         process.env.PUBLIC_URL + '/logo.png',
}



function App() {
  var [login,setLogin] = useState(false)

let chekedLogin = ()=> {

  setLogin(true);
}
  return ( <div>
    <Router>
    <Navbar isloggedin = {login}  details={details}></Navbar>
      <Switch>
      <Route exact path="/"  component={Home}/>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={ (props)=><Login {...props} callme={chekedLogin}/>} />
      <Route exact path="/search" component={Search} />

      <Route exact path="/cake/:cakeid" component={Cakedetails} />
      <Route exact path="/*" component={Pagenotfound} />
      </Switch>
    </Router>
    </div>
  )
}

export default App;
