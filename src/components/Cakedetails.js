
import axios from 'axios';
import {useParams} from "react-router-dom";
import { useEffect, useState } from 'react';

var URL = process.env.REACT_APP_BASE_API_URL+"/cake/";
function Cakedetail(props){
    var param=useParams();
    var APIUrl=URL+param.cakeid
    var [cakedetails, setCakesdetail] = useState([])
    useEffect(()=>{
        axios({
            url:APIUrl,
            method:"GET",
        }).then((response)=>{
            console.log(response.data.data);
            setCakesdetail(response.data.data)
        },(error)=>{
            console.log("Error..",error)
        }
        )
    },[]

    )
    return  (
        <>
            <div className="container">
                <div className="row">
                    <div class="card mb-3" >
                <div class="row no-gutters">
                    <div class="col-md-4">
                    <img src={cakedetails.image}  class="card-img" alt={cakedetails.name} />
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{cakedetails.name}</h5>
                        <p class="card-text">Details - {cakedetails.description}</p>
                        <p class="card-text">Price - <strong>Rs. {cakedetails.price}</strong></p>
                        <p class="card-text">Cake Type -  {cakedetails.eggless && 'Eggless'}</p>
                    </div>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </>
    )
}
export default Cakedetail