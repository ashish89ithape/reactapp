
let Card = (props) =>{
    if(props.data){
        return (
        <div className="card" style={{"width":" 20rem","margin":"auto"}}>
        <img className="card-img-top" src={props.data.image_url} alt="Card image cap"/>
        <div className="card-body">
        {/* <h5 className="card-title">Card title</h5> */}
        <p className="card-text">{props.data.name}</p>
        
        <small className="text-muted " style = {{"color":"red"}}> Rs {props.data.price}</small>
             
            { props.data.discount ? <span style ={{"text-align":"right", "padding":"15px"}}>Discount :{props.data.discount}</span> :'' }
        
        </div>
        </div>
      
            )
        }
        else{
            return null
        }
}
export default Card