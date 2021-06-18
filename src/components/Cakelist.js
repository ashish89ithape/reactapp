import axios from 'axios';
import Cake from './Cake';
import { useState, useEffect } from 'react';

var URL = process.env.REACT_APP_BASE_API_URL+"/allcakes";
let Cakelist = ()=>{
    var [data,setData]          = useState([]);
    var [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        axios({
            method:"GET",
            url   :URL,
            data  :'JSON'
        }).then((response)=>{
            setLoading(false);
            let CakeData = response.data.data
            setData(CakeData)
        }, (error)=>{
            alert('Cake list is Empty');
            setLoading(false)
        })
        },[]
    )
    return(
            <div className="wrapper">
                <div className="cake-container">
                    {isLoading && <div id="loadingImage">
                        <img src={process.env.PUBLIC_URL + '/Material-Loading-CSS.gif'} alt="Loading" style={{ "width":"100%" }} />
                    </div>}
                    <div className="card-groups">
                        {
                        data.map((each,index)=>{
                            return ( <Cake data={each} index={index} key={index}></Cake> )
                        }) }
                    </div>
                </div>
            </div>
    )
}
export default Cakelist