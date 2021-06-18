import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer class="footer font-small blue">
            <div className="wrapper">
            <p class="copyright">Copyright © 2021, <Link path="/"> CakeShop</Link></p> 
            
            </div>
            
        </footer>


    )
}

export default Footer