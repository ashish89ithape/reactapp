
import data from './data';

import Cakelist from './Cakelist.js';
let Cake = (props)=>{
    return(
      <div className="list-container" >
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