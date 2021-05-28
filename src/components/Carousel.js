function Carousel() {
    return (
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img  height={600} src={process.env.PUBLIC_URL + '/banners/1.jpg'} className="d-block w-100" alt="banner" />
                </div>
                <div class="carousel-item">
                <img  height={600} src={process.env.PUBLIC_URL + '/banners/2.jpg'} className="d-block w-100" alt="banner" />
                </div>
                <div class="carousel-item">
                <img height={600} src={process.env.PUBLIC_URL + '/banners/3.jpg'} className="d-block w-100" alt="banner" />
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Carousel 