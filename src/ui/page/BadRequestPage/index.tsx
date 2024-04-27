import {Box, Button, Typography} from '@mui/material';
import Grid from '@mui/material/Grid';
import NavbarTop from "../../component/NavbarTop";
import {Link} from "react-router-dom";

export default function BadRequestPage() {
    return (
        <>
            <NavbarTop/>
            <Box
                sx={{
                    height: "80vh",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: "wrap"
                }}
            >
                <Grid item xs={6}>
                    <Typography variant="h6">
                        The page you’re looking for doesn’t exist.
                    </Typography>
                    <Link to="/"><Button variant="contained">Back Home</Button></Link>
                </Grid>
                <Grid item xs={6}>
                    <img
                        src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                        alt=""
                        width={500} height={250}
                    />
                </Grid>
            </Box>
        </>
    );
}