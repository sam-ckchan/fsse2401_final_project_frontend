import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {CircularProgress, Tooltip} from "@mui/material";
import HomeSvgLinkIcon from "../HomeSvgLinkIcon";
import ClickableCartIcon from "../ClickableCartIcon";
import {useNavigate} from "react-router-dom";
import {useLoginUserContext} from "../../../context/LoginUserProvider.tsx";
import Avatar from "@mui/material/Avatar";
import SignOutButton from "./component/SignOutButton";
import {useState} from "react";
import ShoppingCartDrawer from "../ShoppingCartDrawer";


const NavbarTop = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const navigate = useNavigate()
    const loginUser = useLoginUserContext()

    const renderLogin = () => {
        // when <App> initial mount or refresh, loginUser === undefined
        if (loginUser === undefined) return <CircularProgress color={"inherit"} size={24}/>
        if (!loginUser) return (
            <Button color="primary" variant="contained" onClick={() => navigate("/login")}>
                Login
            </Button>)
        const {photoURL, email, displayName} = loginUser
        return (
            <>
                <Tooltip title={email}>
                    {
                        photoURL
                            ? <Avatar alt={displayName || "anonymous"} src={photoURL}/>
                            :
                            <Avatar sx={{bgcolor: "orange"}}>{displayName || email!.slice(0, 2).toUpperCase()}</Avatar>
                    }
                </Tooltip>
                <SignOutButton/>
            </>
        )
    }

    return (
        <Box sx={{mb: 3}}>
            <AppBar position="static">
                <Toolbar>
                    <HomeSvgLinkIcon/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Upgrade Your Laptop!
                    </Typography>
                    <ClickableCartIcon
                        style={{marginRight: "2rem", width: "2rem"}}
                        type="shopping"
                        to="/shoppingcart"
                        setIsDrawerOpen={setIsDrawerOpen}
                    />
                    {renderLogin()}
                </Toolbar>
            </AppBar>
            <ShoppingCartDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen}/>
        </Box>
    );
};

export default NavbarTop;