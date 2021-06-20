
import {  Link } from "react-router-dom"

function Emptycart(props) {

    if (!localStorage.token) {
        props.history.push('/login')
        return false;
    }
    return (
        <>
             <div className="container">
                <div className="row">
                    <div className="col-lg-12">

                        <nav aria-label="breadcrumb mt-2">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li aria-current="page" className="breadcrumb-item active">Shopping cart</li>
                            </ol>
                        </nav>
                    </div>
                    <div id="basket" className="col-lg-9">
                        <div className="box">
                        <h1>Empty Shopping cart</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Emptycart