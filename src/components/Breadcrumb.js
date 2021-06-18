
import {Link} from "react-router-dom"
function breadcrumb() {
    return(
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link href="#">Home</Link></li>
                    <li class="breadcrumb-item"><Link href="#">Library</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Data</li>
                </ol>
            </nav>
        </>
    )
}
export default breadcrumb