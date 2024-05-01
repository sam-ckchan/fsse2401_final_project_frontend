import NavbarTop from "../../component/NavbarTop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCartItemContext} from "../../../context/CartItemProvider.tsx";
import bgImgUrl from "../../../assets/crewcut_poster.jpg"

const timeOutValue = 5
const ThankyouPage = () => {
    const [second, setSecond] = useState<number>(timeOutValue)

    const {setCartCount} = useCartItemContext()

    const navigate = useNavigate();

    useEffect(() => {
        if (second === timeOutValue) setCartCount(0)
        if (second <= 0) {
            navigate("/")
        }
        const timerId = setTimeout(
            () => setSecond(prevSec => prevSec - 1),
            1000
        )
        return () => clearInterval(timerId)
    }, [second])

    return (
        <>
            <NavbarTop/>
            <Box
                sx={{
                    textAlign: "center",
                    backgroundImage: `url(${bgImgUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: "92.5vh",
                    mt: -3
                }}
            >
                <Typography variant="h4" color="white"> Payment Success. Thank You 🤍 </Typography> <br/>
                <Typography variant="h6" color="white"> Redirect to Home Page in {second}... </Typography>
            </Box>
        </>
    );
};

export {ThankyouPage};