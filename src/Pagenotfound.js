import {Link} from "react-router-dom"
function Pagenotfound(){
    return(
        <div className="container">
            <div className="row">
                    <div className="col-lg-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mt-2">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li aria-current="page" className="breadcrumb-item active">Page not Found</li>
                            </ol>
                        </nav>
                    </div>
            </div>
            <p><img style={{"width":"100%"}} src={process.env.PUBLIC_URL + '/404.jpg'}  alt="Page not found" /></p>
            
        </div>
    )
}

export default Pagenotfound