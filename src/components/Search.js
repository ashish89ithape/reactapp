import Cakelist from './Cakelist';
import axios from 'axios';
import { useEffect, useState } from "react";
import querystring from "query-string";

function Search(props){
    var [Cakes,setCakes] = useState([]);
    var query = querystring.parse(props.location.search);
    var URL = process.env.REACT_APP_BASE_API_URL+"/searchcakes?q="+query.q
    useEffect(()=>{
        axios({
            url:URL,
            method:"GET",
        }).then((response)=>{
            setCakes(response.data.data)
        },()=>{})
     }, [query.q]);

     if (Cakes.length === 0) {
        return (
            <div class="container">
                <div>
                    <center><h1>No Cake found!</h1></center>
                </div>
            </div>
        );
     }

    return (
        <div className="container">
            <div className="row">
                { Cakes.map((each,index)=>{
                    return (<Cakelist data={each} key={index}></Cakelist>)
                })}
            </div>
        </div>
    )
}
export default Search