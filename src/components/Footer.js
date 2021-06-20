import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="footer font-small blue">
            <div className="wrapper">
            <p className="copyright">Copyright © 2021, <Link to="/"> CakeShop</Link></p> 
            
            </div>
            
        </footer>


    )
}

export default Footer