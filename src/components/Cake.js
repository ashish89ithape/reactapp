import { Link, withRouter } from "react-router-dom";
import axios from 'axios'
import { connect } from 'react-redux';

function Cake(props) {

var AddCartURL = process.env.REACT_APP_BASE_API_URL+"/addcaketocart";
let addToCart = (cakeid, name, image, price, weight) => {
    if (!localStorage.token) {
        props.history.push('/login')
        return false;
    }

    let cartData = {
        cakeid: cakeid,
        name:   name,
        image:  image,
        price:  price,
        weight: 0.5,
    }
    axios({
        method: "POST",
        data: cartData,
        url: AddCartURL,
        headers: {
            authtoken: localStorage.token
        }
    }
    ).then((response) => {
        props.dispatch({
            type: "ADDTOCART",
            payload: response.data
        })
        props.history.push('/cart')
    }, (error) => {})
}

    if(props.data){
        return (
            <div className="col-sm-3" >
            <div className="single-cake">
                <div className="aspectRation">
                    <Link to={'/cake/'+props.data.cakeid}>
                        <img className="card-img-top" src={props.data.image} style ={{"height":"200px"}} alt="Cake"/>
                    </Link>
                </div>
                <div className="card-body">
                    <p className="card-text">{props.data.name}</p>
                    <h6 className="card-title"> Rs {props.data.price}</h6>
                    { props.data.discount ? <span style ={{"text-align":"right", "padding":"15px"}}>Discount :{props.data.discount}</span> :'' }
                </div>
                <button onClick={() => addToCart(props.data.cakeid, props.data.name, props.data.image, props.data.price, props.data.weight)} className="btn btn-pink-cake mar-right-10">Add to Cart</button>
            </div>
            </div>
        )
    }
    else{
        return null
    }
}
// Cake = withRouter(Cake)
export default connect()(withRouter(Cake));