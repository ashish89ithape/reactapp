import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
    const [orders, getOrders]   = useState([])
    var [isLoading, setLoading] = useState(true);
    let totalPrice = 0
    useEffect(() => {
        axios({
            url: process.env.REACT_APP_BASE_API_URL + '/cakeorders',
            method: 'post'
        }).then(res => {
            const ordersList = res.data.cakeorders
            getOrders(ordersList)
            setLoading(false)
        }, err => {})
    }, [])

    return (
            <div className="wrapper">
                <div className="cake-container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb  mt-2">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li aria-current="page" className="breadcrumb-item active">Orders</li>
                                </ol>
                            </nav>
                        </div>
                    <div className="col-lg-12">
                        <h1>My Orders</h1>
                        {isLoading && <div id="loadingimage">
                                <img src={process.env.PUBLIC_URL + '/Material-Loading-CSS.gif'} alt="Loading" style={{ "width":"100%" }} />
                            </div>}
                        { !isLoading && orders.length > 0 && <div className="accordion" id="accordionExample">
                            {
                                orders.map((each, index) => { let totalPrice = 0
                                    return (
                                        <>
                                            <div className="card"  key={index}>
                                                <div className="card-header" id={"heading"+(index)}>
                                                    <h2 className="mb-0" style={{"padding": "0px"}}>
                                                        <button className="btn btn-link btn-block text-left collapsed" type="button"
                                                                data-toggle="collapse" data-target={"#collapse"+(index)}
                                                                aria-expanded="true" aria-controls={"collapse"+(index)}>
                                                            Order #: {each.orderid} on {each.orderdate} for {each.name}
                                                        </button>
                                                    </h2>
                                                </div>

                                                <div id={"collapse"+(index)} className="collapse cart" aria-labelledby={"heading"+(index)}
                                                    data-parent="#accordionExample">
                                                    {   
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Image</th>
                                                                        <th>Name</th>
                                                                        <th>Quantity</th>
                                                                        <th>Weight (Kg)</th>
                                                                        <th>Unit price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {each.cakes.map((eachCake, cakeIndex) => {
                                                                        totalPrice += eachCake.price
                                                                        return (
                                                                            <tr className={index}>
                                                                                <td>
                                                                                    <p className="link"><Link to={'/cake/'+eachCake.cakeid}><img className="cart-img" src={eachCake.image} alt="Cake"/></Link></p>
                                                                                </td>
                                                                                <td><p className="link"><Link to={'/cake/'+eachCake.cakeid}>{eachCake.name}</Link></p></td>
                                                                                <td>
                                                                                    {eachCake.quantity}
                                                                                </td>
                                                                                <td>
                                                                                    {eachCake.weight}
                                                                                </td>
                                                                                <td>Rs. {eachCake.price}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <th colSpan="4">Total</th>
                                                                        <th colSpan="2">Rs.{totalPrice}</th>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div> }
                        {isLoading &&  orders.length === 0 && <div className="accordion" id="accordionExample">
                            No Orders Found!!
                        </div>}
                    </div>
                </div>
                </div>
            </div>
    )
}

export default Orders