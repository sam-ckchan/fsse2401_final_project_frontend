import NavbarTop from "../../component/NavbarTop";
import ProductCard from "../../component/ProductCard";
import Grid from "@mui/material/Grid";
import {Container, Skeleton} from "@mui/material";
import {useEffect, useState} from "react";
import {GetAllProductsDto} from "../../../data/products/products.type.ts";
import * as productApi from "../../../api/productApi.ts"
import {useNavigate} from "react-router-dom";
import ScrollToTopBtn from "../../component/ScrollToTopBtn";
import ProductCarousel from "./component/ProductCarousel";
import PriceSlider from "./component/PriceSlider";
import {maxStep} from "../../../data/products/productsSliderMarks.ts";
import "./styles.css"

export function ProductListPage() {
    const [products, setProducts] = useState<GetAllProductsDto[] | undefined>(undefined)
    const [sliderVal, setSliderVal] = useState(maxStep)

    const navigate = useNavigate();

    const fetchAllProduct = async () => {
        try {
            const data = await productApi.getAllProducts()
            setProducts(data)
        } catch {
            navigate("/error")
        }
    }
    useEffect(() => {
        fetchAllProduct().catch() //stop promise chain by handling promise with catch
    }, []);

    if (!products) return renderSkeleton();

    const filteredProducts = products.filter(product => product.price <= sliderVal)

    return (
        <div id="back-to-top-anchor">
            <NavbarTop/>
            <Container
                maxWidth={false}
                sx={{display: "flex", justifyContent: "center", mt: -3, pt: 3}}
                className="video-container"
            >
                <video autoPlay muted loop>
                    <source
                        src="https://fsse2401-project-sam.s3.ap-southeast-1.amazonaws.com/myAssetHosting/mixkit-bubbles-of-water-rising-to-the-surface-186-medium.mp4"
                        type="video/mp4"
                    />
                </video>
                <ProductCarousel
                    products={products}
                />
            </Container>
            <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <PriceSlider setSliderVal={setSliderVal} sliderVal={sliderVal}/>
                <Grid container rowSpacing={4} columnSpacing={1}
                      columns={{xs: 2, sm: 12, md: 12}}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={1} sm={4} md={3} key={product.pid}>
                            <ProductCard {...product}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <ScrollToTopBtn/>
        </div>
    )
}

const renderSkeleton = () => (
    <>
        <NavbarTop/>
        <Container>
            <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", mb: 1}}>
                <Skeleton variant="rounded" animation="wave" width={600} height={600}/>
            </Container>
            <Grid container rowSpacing={4} columnSpacing={1}
                  columns={{xs: 2, sm: 12, md: 12}}>
                {Array(10).fill(0).map((_, i) => (
                    <Grid item xs={1} sm={4} md={3} key={i}>
                        <Skeleton
                            variant="rounded"
                            animation="wave"
                            height={419}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>
)

