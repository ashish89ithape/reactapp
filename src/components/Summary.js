import {connect} from "react-redux"
import {useState,useEffect} from "react"
import axios from "axios"
let Summary=function(props){
    let [items, setItems]=useState([])
    var URL = process.env.REACT_APP_BASE_API_URL+"/cakecart";
    useEffect(()=>{
        let SummaryURL = URL
        axios({
            url:SummaryURL,
            method:"post",
            headers:{Authtoken:localStorage.token}
        }).then((response)=>{
            console.log(response.data)
            setItems(response.data.data)
            props.dispatch({
                type:"SUMMARY",
                payload:response.data.data
            })
            console.log("local ",items)
        }).catch((error)=>{
            console.log('error from cakecart api',error)
        })
    },[])
    let total_cost=0
    console.log(props)
    return (
        
        <>
        <h3>Cart Summary</h3>
        <table className="table" >
        <thead>
            <tr> 
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
            </tr>
        </thead>
        {props.data && props.data.map((prod,index)=>{
            total_cost+=prod.price
            return( <tr>
                <td>{prod.name}</td>
                <td>₹{prod.price}</td>
                <td><img src={prod.image} style={{"width":"100px","height":"100px"}} alt="img"/></td>
            </tr>)
        })}
        <tr><th>Total</th><th>₹{total_cost}</th><td></td></tr>
        </table>
        </>
    );   
}

export default connect(function(state,props){
    console.log('state',state)
    return{
       
        cart:state && state?.cart
    }
})(Summary)