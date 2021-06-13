import axios from 'axios';
import {useParams, Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

var URL = process.env.REACT_APP_BASE_API_URL+"/cake/";
var AddCartURL = process.env.REACT_APP_BASE_API_URL+"/addcaketocart";
function Cakedetails(props){
    var param  = useParams();
    var APIUrl = URL+param.cakeid
    var [cakedetails, setCakesdetail] = useState([])
    var [isLoading, setLoading]       =  useState(true);
    useEffect(()=>{
        axios({
            url:APIUrl,
            method:"GET",
        }).then((response)=>{
            setLoading(false)
            setCakesdetail(response.data.data)
        },(error)=>{
            setLoading(false)
            alert('Cake not found');
        }
        )
    },[])

    let addToCart = () => {
        if (!localStorage.token) {
            props.history.push('/login')
            return false;
        }

        let cartData = {
            cakeid: cakedetails.cakeid,
            name:   cakedetails.name,
            image:  cakedetails.image,
            price:  cakedetails.price,
            weight: cakedetails.weight,
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
    return  (
        <>
            <div className="container">
                <div className="col-lg-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mt-2">
                            <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                            {cakedetails.name && <li aria-current="page" className="breadcrumb-item active">{cakedetails.name}</li>}
                        </ol>
                    </nav>
                </div>
                {isLoading && <div id="loadingimage">
                    <img src={process.env.PUBLIC_URL + '/Material-Loading-CSS.gif'} alt="Loading" style={{ "width":"100%" }} />
                </div>}
                {!isLoading &&  <div className="row">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={cakedetails.image}  className="card-img" alt={cakedetails.name} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{cakedetails.name}</h5>
                                    <p className="card-text">Details - {cakedetails.description}</p>
                                    <p className="card-text">Price - <strong>Rs. {cakedetails.price}</strong></p>
                                    <p className="card-text">Cake Type -  {cakedetails.eggless && 'Eggless'}</p>
                                    <button onClick={addToCart}  className="btn btn-primary"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default connect()(Cakedetails);