import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer class="footer font-small blue">
            <div class="footer-copyright text-center">© 2021 Copyright:
                <Link path="/"><p > CakeShop</p></Link>
            </div>
        </footer>
        
    )
}

export default Footer