import NavbarTop from "../../component/NavbarTop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const ThankyouPage = () => {
    const [second, setSecond] = useState<number>(5)

    const navigate = useNavigate();

    useEffect(() => {
        if (second <= 0) navigate("/")
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
                    backgroundImage: 'url(https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/428682366_18016185383157723_2642410493154053121_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=H96bRhsrV6cAb4wW4uM&_nc_ht=scontent-hkg1-1.xx&oh=00_AfBP1WSRvylzyVaNtE5Jg_D5WgSwFUetzexTroUz2-_Z-Q&oe=662EDEA7)',
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

export default ThankyouPage;