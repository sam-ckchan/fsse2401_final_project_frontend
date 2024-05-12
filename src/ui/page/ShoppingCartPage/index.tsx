import NavbarTop from "../../component/NavbarTop";
import ShoppingCartTable from "./component/ShoppingCartTable";
import {useEffect, useState} from "react";
import {GetCartItemDto} from "../../../data/cartItem/cartItem.type.ts";
import * as cartItemApi from "../../../api/cartItemApi.ts";
import GradientCircularProgress from "../../component/GradientCircularProgress";
import Box from "@mui/material/Box";
import {useLoginUserContext} from "../../../context/LoginUserProvider.tsx";
import {Backdrop, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const ShoppingCartPage = () => {
    const [cartItems, setCartItems] = useState<GetCartItemDto[] | undefined>(undefined)
    const [isBackdropOpen, setIsBackdropOpen] = useState(false);

    const navigate = useNavigate();

    // [BUG] authentication error also occur when you refresh, because loginUser in Provider is null (no access token)
    // [FIX] refetch cartitems when loginUser update (context hook will rerender its consumer)
    const loginUser = useLoginUserContext()

    const handleFetchCartItems = async () => {
        try {
            const newCartItems = await cartItemApi.getCartItem()
            setCartItems(newCartItems)
        } catch (err) {
            if ((err as Error).message.includes("authentication required"))
                navigate("/error")
        }
    }

    useEffect(() => {
        handleFetchCartItems().catch()
    }, [loginUser]) // run when mounted & loginUser update (not when cartItems update)

    return (
        <>
            <NavbarTop/>
            {
                cartItems
                    ? <ShoppingCartTable
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        setIsBackdropOpen={setIsBackdropOpen}
                    />
                    : <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={20}>
                        <GradientCircularProgress size={250}/>
                    </Box>
            }
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};
