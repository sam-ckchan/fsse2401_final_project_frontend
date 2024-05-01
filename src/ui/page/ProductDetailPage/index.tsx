import {useEffect, useState} from "react";
import Description from "./component/Description";
import Gallery from "./component/Gallery";
import {GetProductDto} from "../../../data/product/product.type.ts";
import NavbarTop from "../../component/NavbarTop";
import {useNavigate, useParams} from "react-router-dom";
import {getProductDetail} from "../../../api/productApi.ts";
import GradientCircularProgress from "../../component/GradientCircularProgress";
import Box from "@mui/material/Box";
import "./styles.css"

type ProductDetailPageParam = { productId: string }

export const ProductDetailPage = () => {
    const {productId} = useParams<ProductDetailPageParam>()
    const navigate = useNavigate()

    const [product, setProduct] = useState<GetProductDto | undefined>(undefined)

    const fetchProductDetail = async () => {
        if (!productId) return
        try {
            const data = await getProductDetail(productId)
            setProduct(data)
        } catch {
            navigate("/error")
        }
    }

    useEffect(() => {
        fetchProductDetail().catch() // stop promise chain by handling promise with catch
        // //    mock-data
        // setProduct(mockProduct)
    }, [])

    return (
        <>
            <NavbarTop/>
            {product
                ? <section className="core">
                    <Gallery imageUrl={product!.image_url}/>
                    <Description {...product}/>
                </section>
                : <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={20}>
                    <GradientCircularProgress size={250}/>
                </Box>
            }
        </>
    )
}
