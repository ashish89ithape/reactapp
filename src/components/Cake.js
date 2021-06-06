
import data from './data';
import axios from 'axios';
import Cakelist from './Cakelist';
import { useEffect, useState } from 'react';


var URL = process.env.REACT_APP_BASE_API_URL+"/allcakes";
let Cake = (props)=>{
  var [data,setData]=  useState([]);
  axios({
    method:"GET",
    url:URL,
    data:'JSON'
  }).then((response)=>{
    console.log(response.data)
    setData(response.data.data)
  }, (error)=>{})
    return(
      <div>
        <div className="card-groups"  >
          { data.map((each,index)=>{
              return (
                <Cakelist data={each} index ={index}></Cakelist>
              )
          }) }
        </div>
      </div>
    )
}
export default Cake