import {useEffect, useState} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

//const Summary = (props) => {
function Summary(props) {
    const [cakes, getCakes] = useState([]);

    let totalPrice = 0

    const activeNextUrl = () => {
        props.history.push('/checkout/address')
    }

    props.dispatch({
        type: "CHECKOUT_ACTIVE_PATH",
        payload: 'summary'
    })

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_BASE_API_URL +'/cakecart',
            method: 'post'
        }).then(res => {
            if (res.data !== 'Session Expired') {
                const cakeList = res.data.data
                getCakes(cakeList);
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
        <div className="container">
            <div className="row">
                {
                    <div className="table-responsive">
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
                                    totalPrice += each.price
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

                }
            </div>
            <div>
                <span style={{float: "left"}}>Total Price: Rs. {totalPrice} /-</span>
                <button className="btn btn-primary" style={{float: "right"}} onClick={activeNextUrl}>
                <span>
                    Next
                </span>
                </button>
            </div>
        </div>
    )
}

// export default connect() (withRouter(Summary))

Summary = withRouter(Summary)
export default connect(function (state, props) {
    return {
        cakes: state.CartReducer.dbCartItems,
        totalPrice: state.CartReducer.totalPrice
    }
})(Summary)