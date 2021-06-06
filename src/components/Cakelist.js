import {Link} from "react-router-dom"
let Cakelist = (props) =>{
    console.log('props.data', props.data)
    if(props.data){
        return (
            <div class="col-sm-3">
            <div className="card" style ={{"height":"350px", "border": "1px solid #ddd", "margin":"0 0 10px 0"}}>
            <Link to={'/cake/'+props.data.cakeid}>
                <img className="card-img-top" src={props.data.image} style ={{"height":"200px"}} alt="Cake"/>
            </Link>
                <div className="card-body">
                    <p className="card-text">{props.data.name}</p>
                    <h6 class="card-title"> Rs {props.data.price}</h6>
                    { props.data.discount ? <span style ={{"text-align":"right", "padding":"15px"}}>Discount :{props.data.discount}</span> :'' }
                </div>
            </div>
            </div>
        )
    }
    else{
        return null
    }
}
export default Cakelist