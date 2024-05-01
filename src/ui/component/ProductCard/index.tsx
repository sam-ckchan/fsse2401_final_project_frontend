import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions} from '@mui/material';
import {GetAllProductsDto} from "../../../data/products/products.type.ts";
import ClickableCartIcon from "../ClickableCartIcon";
import OutOfStockCartIcon from "../OutOfStockCartIcon";
import {DescContainer} from "../DescContainer";
import {useNavigate} from "react-router-dom";
import {SyntheticEvent} from "react";
import "./styles.css"

export default function ProductCard({name, price, description, image_url, has_stock, pid}: GetAllProductsDto) {
    const navigate = useNavigate()
    const handleImgLoadingErr = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement
        target.onerror = null; // prevent looping
        target.src = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW1uMDk1eXIzN2V2Mzk4d3BudzZyejE0YmR3OHAzcWU0d212enVuMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C21GGDOpKT6Z4VuXyn/giphy.gif"
    }
    return (
        <Card sx={{maxWidth: 345}}>
            <CardActionArea onClick={() => navigate("/product/" + pid)}>
                <CardMedia
                    component="img"
                    height="240"
                    image={image_url}
                    alt={name}
                    sx={{mb: 1, objectFit: "scale-down"}}
                    onError={handleImgLoadingErr}
                />
                <CardContent sx={{p: 1.5}}>
                    <Typography gutterBottom variant="h6" component="div" sx={{height: "64px", textAlign: "center"}}>
                        {name}
                    </Typography>
                    <DescContainer variant="body2" color="text.secondary">
                        {description || "no info"}
                    </DescContainer>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{justifyContent: "space-between"}}>
                {has_stock
                    ? <ClickableCartIcon pid={pid}/>
                    : <OutOfStockCartIcon/>}
                <Typography variant="body2" color="info" onClick={e => e.stopPropagation()}>
                    $ {price.toLocaleString()}
                </Typography>
            </CardActions>
        </Card>
    );
}