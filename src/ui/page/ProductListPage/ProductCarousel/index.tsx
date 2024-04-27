import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import {GetAllProductsDto} from "../../../../data/products/products.type.ts";

type ProductCarouselProps = { products: GetAllProductsDto[] }

type CarouselItemProps = { image_url: string }

function Item({image_url}: CarouselItemProps) {
    return (
        <Paper>
            <img src={image_url} alt="product-slide"
                 style={{
                     width: "600px",
                     backgroundSize: "cover",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center"
                 }}
            />
        </Paper>
    )
}

const ProductCarousel = ({products}: ProductCarouselProps) => {
    return (
        <Carousel
            height="600px"
            animation="slide"
            interval={2000}
            sx={{mb: 10, width: 600}}
        >
            {products.map(({pid, image_url}) => <Item key={pid} image_url={image_url}/>)}
        </Carousel>
    );
};

export default ProductCarousel;

