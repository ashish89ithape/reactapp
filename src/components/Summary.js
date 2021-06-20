import axios from "axios";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

//const Summary = (props) => {
function Summary(props) {
    console.log('propspropsprops',props)
   // const [cakes, getCakes] = useState([]);
    let cakes = props.cakes
    let totalPrice = 0

    const activeNextUrl = () => {
        props.history.push('/checkout/address')
    }

    props.dispatch({
        type: "CHECKOUT_ACTIVE_PATH",
        payload: 'summary'
    })

   

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
                                        <tr className={index}>
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
                                    <th colSpan="3">Total</th>
                                    <th colSpan="2">Rs.{totalPrice}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                }
            </div>
            <div className="row">
                <button className="btn btn btn-pink-cake" style={{float: "right"}} onClick={activeNextUrl}>
                <span>
                    Next
                </span>
                </button>
            </div>
        </div>
    )
}

// export default connect() (withRouter(Summary))

export default connect(function (state, props) {
    return {
        cakes: state.CartReducer.cart,
        totalPrice: state.CartReducer.totalPrice
    }
})(withRouter(Summary))