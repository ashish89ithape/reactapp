import {Link, Route} from "react-router-dom";
import Summary from "./Summary";
import Address from "./Address";
import {connect} from "react-redux";
import {placeOrderMiddleware} from "../reduxstore/middleware";
import {withRouter} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

let Checkout = (props) => {
    console.log('checkoutprops',props);
    let totalPrice = 0;
    let activePath = 'checkout'

    useEffect(() => {
        if (!localStorage.token) {
            props.history.push('/login')
            return false;
        }
        if (props.cakes.length === 0) {
            axios({
                url: process.env.REACT_APP_BASE_API_URL +'/cakecart',
                method: 'post'
            }).then(res => {
                if (res.data !== 'Session Expired') {
                    const cakeList = res.data.data
                    //getCakes(cakeList);
                    props.dispatch({
                        type: "SHOW_CART",
                        payload: {
                            data: cakeList
                        }
                    })
                } else {
                    props.history.push('/login')
                }
            }, err => {
                console.log('error')
            })
        }
    }, [])


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
        <div className="wrapper">
            <div className="cake-container">
                <div className="row">
                    <div className="col-lg-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb  mt-2">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li aria-current="page" className="breadcrumb-item active">Shopping Cart</li>
                            </ol>
                        </nav>
                    </div>
                <div className="col-lg-12">
                <h1>Checkout</h1>
                <ul className="nav nav-tabs" style={{width: '100%'}}>
                    <li className={"nav-item " + (activePath==="checkout" ? "active" : "")} >
                        <Link className="nav-link" aria-current="page" to={'/checkout'} >Order Summary</Link>
                    </li>
                    <li className={"nav-item " + (activePath==="address" ? "active" : "")} >
                            <Link className="nav-link" to={'/checkout/address'} >Address Details</Link>
                    </li>

                </ul>
                <div className="cart" style={{"margin-top":"10px"}}>
                    <div className="card-body" style={{padding: '0' }}>
                        {activePath==='checkout' && <Route exact path="/checkout"><Summary  /></Route>}
                        {activePath==='address' && <Route exact path="/checkout/address"><Address onSubmit={handleAddressSubmit} /></Route> }

                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

Checkout = connect(function (state, props) { console.log('state', state);

    // if(state.CartReducer?.cart && state.CartReducer.cart.length < 1) {
    //     props.history.push('/emptycart')
    // }
    if(state.CartReducer.success) {

        props.history.push('/orders')
        state.CartReducer.success = false
    }
    return {
        cakes: state.CartReducer.cart
    }
}) (Checkout)

export default withRouter(Checkout)