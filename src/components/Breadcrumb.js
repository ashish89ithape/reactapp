
import {Link} from "react-router-dom"
function breadcrumb() {
    return(
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                </ol>
            </nav>
        </>
    )
}
export default breadcrumb