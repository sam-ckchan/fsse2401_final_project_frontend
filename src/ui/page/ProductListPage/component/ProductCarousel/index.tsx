import Carousel from "react-material-ui-carousel";
import {GetAllProductsDto} from "../../../../../data/products/products.type.ts";
import {useMediaQuery} from "@mui/material";

type ProductCarouselProps = { products: GetAllProductsDto[] }

type CarouselItemProps = { image_url: string }

function Item({image_url}: CarouselItemProps) {
    const isSmallScreen = useMediaQuery('(max-width:620px)');
    return (
        <div style={{backgroundColor: "transparent"}}>
            <img src={image_url} alt="product-slide"
                 style={{
                     width: isSmallScreen ? "300px" : "600px",
                     height: isSmallScreen ? "300px" : "600px",
                     backgroundSize: "cover",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                 }}
            />
        </div>
    )
}

const ProductCarousel = ({products}: ProductCarouselProps) => {
    const isSmallScreen = useMediaQuery('(max-width:620px)');
    return (
        <Carousel
            height={isSmallScreen ? "300px" : "600px"}
            animation="slide"
            interval={2000}
            sx={{mb: 10, width: isSmallScreen ? "300px" : "600px"}}
        >
            {products.map(({pid, image_url}) => <Item key={pid} image_url={image_url}/>)}
        </Carousel>
    );
};

export default ProductCarousel;

