import { Route, withRouter } from "react-router";
import { useRouteMatch, Link } from "react-router-dom"
import { connect } from "react-redux";

function Emptycart(props) {

    var route = useRouteMatch();
    var url = route.url
    var path = route.path
    if (!localStorage.token) {
        props.history.push('/login')
        return false;
    }
    return (
        <>
             <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <nav aria-label="breadcrumb mt-2">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li aria-current="page" className="breadcrumb-item active">Shopping cart</li>
                            </ol>
                        </nav>
                    </div>
                    <div id="basket" className="col-lg-9">
                        <div className="box">
                        <h1>Empty Shopping cart</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
Emptycart = withRouter(Emptycart)
export default connect()(Emptycart)