let Navbar= (props)=>{

    let  searchstring
    let  search = (event)=> {
        event.preventDefault()
        if (searchstring != null) {
            alert(searchstring);
        } else {
            alert("Please Enter text for Search...");
        }
    }
    let getserchText = (event)=> {
        searchstring = event.target.value;
    }
      return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><img src={props.details.logo} style={{width:100}}/>{props.details.projectname}</a>
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
                        <a className="nav-link active pull-right" aria-current="page" href="#">Logout <b>({props.details.username})</b></a>
                        </li>
                    </ul>
                </div>

            </div>
          </div>
        </nav>
      )
  }
  
  export default Navbar;