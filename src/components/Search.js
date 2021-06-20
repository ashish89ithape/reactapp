import Cake from './Cake';
import axios from 'axios';
import { useEffect, useState } from "react";
import querystring from "query-string";

function Search(props){
    var [Cakes,setCakes]        = useState([])
    var [isLoading, setLoading] = useState(true)
    var query = querystring.parse(props.location.search)
    var URL   = process.env.REACT_APP_BASE_API_URL+"/searchcakes?q="+query.q

    useEffect(()=>{
        axios({
            url:URL,
            method:"GET",
        }).then((response)=>{
            setLoading(false)
            setCakes(response.data.data)
        },(error)=>{setLoading(false)})
     }, [URL, query.q]);

     if (Cakes.length === 0) {
        return (
            <div className="container">
                {isLoading && <div id="loadingImage">
                <img src={process.env.PUBLIC_URL + '/Material-Loading-CSS.gif'} alt="Loading" style={{ "width":"100%" }} />
                </div>}
                {!isLoading && <div>
                    <center><h1>No Cake found!</h1></center>
                </div> }
            </div>
        );
     }

    return (
        <div className="wrapper">
            <div className="cake-container">
                {isLoading && <div id="loadingImage">
                <img src={process.env.PUBLIC_URL + '/Material-Loading-CSS.gif'} alt="Loading" style={{ "width":"100%" }} />
                </div>}
                <div className="card-groups">
                    {
                    Cakes.map((each,index)=>{
                    return ( <Cake data={each} index={index} key={index}></Cake> )
                    }) }
                </div>
            </div>
        </div>
    )
}
export default Search

