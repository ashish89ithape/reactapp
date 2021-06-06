import {Link, Router, withRouter} from "react-router-dom";
let Navbar= (props)=>{
    let  searchstring
    let  search = (event)=> {
        event.preventDefault()
        if (searchstring != null) {
            var url = "/search?q="+searchstring
            props.history.push(url)
        } else {
            alert("Please Enter text for Search...");
        }
    }

    let getserchText = (event)=> {
        searchstring = event.target.value;
    }

    let logout = ()=>{
        localStorage.clear();
        props.history.push("/login")
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Link to="/"> <a className="navbar-brand" href="#"><img src={props.details.logo} style={{width:100}}/>{props.details.projectname}</a></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="col-sm-4">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Cup Cake</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Chocolate Cake</a>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-5">
                    <form className="d-flex align-items-end pull-right">
                        <input className="form-control me-2" onChange = {getserchText} type="search" placeholder="Search" aria-label="Search"/>
                        <button className="search btn btn-outline-success" onClick={search} type="submit">Search</button>
                    </form>
                </div>

                <div className="col-sm-3">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active pull-right" aria-current="page" href="#"> {localStorage.name && localStorage.name }</a>
                        </li>
                        <li>
                            {!localStorage.loggedin && <Link to="/login"><button className="search btn btn-primary mr-2" type="button">Login</button></Link>}
                            {localStorage.loggedin && <button className="search btn btn-danger"  onClick={logout} type="button">Logout</button>}
                            {!localStorage.loggedin && <Link to="/signup"><button className="search btn btn-primary"  type="button">Sign Up</button></Link>}
                        </li>
                    </ul>
                </div>

            </div>
            </div>
        </nav>
    )
  }

  Navbar = withRouter(Navbar)
  export default Navbar;