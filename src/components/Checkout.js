import {Link, Route} from "react-router-dom";
import Summary from "./Summary";
import Address from "./Address";
import {connect} from "react-redux";
import {placeOrderMiddleware} from "../reduxstore/middleware";
import {withRouter, useRouteMatch} from "react-router-dom";

let Checkout = (props) => {

    let totalPrice = 0;
    let activePath = 'checkout'
    var route = useRouteMatch();
    var url = route.url
    var path = route.path
    if (!localStorage.token) {
        props.history.push('/login')
        return false;
    }

    const handleAddressSubmit = (data) => {
      console.log('props', props);
        props.cakes.map((each, index) => {
            totalPrice += each.price
            return totalPrice
        })
        data.price = totalPrice
        data.cakes = props.cakes
        props.dispatch(placeOrderMiddleware(data))
    }

    if (props.location.pathname === "/checkout/address") {
        activePath = 'address'
    }


    return (
        <div className="container" style={{marginTop: "100px"}}>
            <h1>Checkout</h1>
            <div className="row">
                <ul className="nav nav-tabs" style={{width: '100%'}}>
                    <li className={"nav-item " + (activePath==="checkout" ? "active" : "")} >
                        <Link className="nav-link" aria-current="page" to={'/checkout'} >Order Summary</Link>
                    </li>
                    <li className={"nav-item " + (activePath==="address" ? "active" : "")} >
                            <Link className="nav-link" to={'/checkout/address'} >Address Details</Link>
                    </li>

                </ul>
                <div className="card" style={{width: '100%',padding: '0' }}>
                    <div className="card-body" style={{padding: '0' }}>
                        {activePath==='checkout' && <Route exact path="/checkout"><Summary  /></Route>}
                        {activePath==='address' && <Route exact path="/checkout/address"><Address onSubmit={handleAddressSubmit} /></Route> }

                    </div>
                </div>
            </div>
        </div>
    )
}

Checkout = connect(function (state, props) { console.log('state', state);

    if(state.CartReducer?.cart && state.CartReducer.cart.length < 1) {
        props.history.push('/emptycart')
    }
    if(state.CartReducer.success) {

        props.history.push('/orders')
        state.CartReducer.success = false
    }
    return {
        cakes: state.CartReducer.cart
    }
}) (Checkout)

export default withRouter(Checkout)