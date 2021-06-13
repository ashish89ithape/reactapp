import { useRouteMatch } from "react-router"
import { Route,Link } from "react-router-dom"
import Summary from './Summary'
import Address from './Address'

var Checkout=function(props){
    var route=useRouteMatch()
    var url=route.url
    var path=route.path

    return(
        <>
        <div className="row">
            <div className="col-4">
                <Link to={url} ><li>Cart Summary</li></Link>
                <Link to={url+"/address"} ><li>Address</li></Link>
            </div>
            <div className="col-8">
                <Route exact path={path} component={Summary}/>
                <Route exact path={path+"/address"} component={Address}/>
            </div>
        </div>
        </>
    )
}

export default Checkout