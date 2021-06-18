
import { Link, withRouter } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'
import { connect } from "react-redux";

function Cart(props) {
    var [cakes, setCakes]           = useState([]);
    var [totalPrice, setTotalPrice] = useState(0);
    var [isLoading, setLoading]     =  useState(true);
    useEffect(() => {
        if (!localStorage.token) {
            props.history.push('/login')
            return false;
        }
        const URL = process.env.REACT_APP_BASE_API_URL+"/cakecart"
        axios({
            method: "POST",
            url: URL,
            headers: {
                authtoken: localStorage.token
            }
        }).then((response) => {
            setLoading(false)
            setCakes(response.data.data)
            if (!response.data.data.length) {
                props.history.push('/emptycart')
                return false;
            }
            props.dispatch({
                type: "CARTITEMS",
                payload: response.data.data
            })

            var total = 0;
            var totalItems = 0;
            response.data.data.forEach(element => {
                total += element.price;
                totalItems = totalItems++;
            });
            props.dispatch({
                type: "TOTALPRICE",
                payload: total
            })
            props.dispatch({
                type: "TOTALITEMS",
                payload: totalItems
            })

            setTotalPrice(total)
        }, (error) => { setLoading(false) })
    }, [])

    var RemoveCakeFromCartUrl = process.env.REACT_APP_BASE_API_URL+"/removecakefromcart";

    let removeItem = (cakeid) => {
        let apiUrl =RemoveCakeFromCartUrl;
        axios({
            url: apiUrl,
            method: "POST",
            headers: { authtoken: localStorage.token },
            data: { cakeid: cakeid }
        }).then(res => {
            props.dispatch({
                type: 'REMOVE_ITEM_FROM_CART',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
    return (
        <>
            <div className="wrapper">
                <div className="cake-container">
                {isLoading && <div id="loadingimage">
                    <img src={process.env.PUBLIC_URL + '/Material-Loading-CSS.gif'} alt="Loading" style={{ "width":"100%" }} />
                </div>}
                {!isLoading && <div className="row">
                    <div className="col-lg-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb  mt-2">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li aria-current="page" className="breadcrumb-item active">Shopping Cart</li>
                            </ol>
                        </nav>
                    </div>

                    <div id="basket" className="col-lg-9">
                        <div className="box">
                            <form method="post">
                                <h1>Shopping Cart</h1>
                                <div className="table-responsive cart">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Unit price</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {cakes.map((each, index) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <p className="link"><Link to={'/cake/'+each.cakeid}><img className="cart-img" src={each.image} alt="Cake"/></Link></p>
                                                        </td>
                                                        <td><p className="link"><Link to={'/cake/'+each.cakeid}>{each.name}</Link></p></td>
                                                        <td>
                                                            {each.quantity}
                                                        </td>
                                                        <td>Rs. {each.price}</td>
                                                        <td><p  className="link" onClick={() => removeItem(each.cakeid)} ><i className="bi bi-trash-fill"></i></p></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="3">Total</th>
                                                <th colspan="2">Rs.{totalPrice}</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                <div className="box-footer d-flex justify-content-between flex-column flex-lg-row mb-2">
                                    <div className="right">
                                        <Link to="/checkout" className="btn btn-pink-cake">Proceed to Checkout <i className="fa fa-chevron-right"></i></Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div id="order-summary" className="box">
                            <div className="box-header">
                                <h3 className="mb-0">Order Summary</h3>
                            </div>
                            <p className="text-muted">Shopping cart summary.</p>
                            <div className="table-responsive cart">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Order subtotal</td>
                                            <th>Rs.{totalPrice}</th>
                                        </tr>

                                        <tr className="total">
                                            <td>Total</td>
                                            <th>Rs.{totalPrice}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div> }
            </div>
            </div>
        </>
    )
}

Cart = connect(function (state, props){
    if (state.CartReducer.removed) {
        state.CartReducer.removed = false
        window.location.reload()
    }
})(Cart)
export default withRouter(Cart)