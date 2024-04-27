import {CircularProgress, Divider, Drawer, List, Typography} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {GetCartItemDto} from "../../../data/cartItem/cartItem.type.ts";
import * as cartItemApi from "../../../api/cartItemApi.ts"
import ShoppingCartDrawerItem from "./ShoppingCartDrawerItem";
import {useNavigate} from "react-router-dom";

export type ShoppingCartDrawerProps = {
    isDrawerOpen?: boolean,
    setIsDrawerOpen?: Dispatch<SetStateAction<boolean>>
}

const ShoppingCartDrawer = ({isDrawerOpen, setIsDrawerOpen}: ShoppingCartDrawerProps) => {
    const [cartItems, setCartItems] = useState<GetCartItemDto[] | undefined | Error>(undefined)

    const navigate = useNavigate()

    // invoked when try to close the drawer
    const closeDrawer = (bool: boolean) => () => setIsDrawerOpen && setIsDrawerOpen(bool)

    const handleFetchCartItems = async () => {
        // show spinner to indicate calling cartItem api to latest data (UI/UX),
        // it will rerender first, not batching with below async setCartItems()
        setCartItems(undefined)
        try {
            const newCartItems = await cartItemApi.getCartItem()
            setCartItems(newCartItems)
        } catch (e) {
            if ((e as Error).message.includes("authentication required")) {
                return setCartItems(e as Error)
            }
            navigate("/error")
        }
    }

    const renderDrawerContent = () => {
        if (cartItems instanceof Error) return (
            <Typography variant="h6" textAlign="center">
                Sign in to use cart
            </Typography>
        )
        if (cartItems === undefined) return <CircularProgress/>
        if (cartItems.length === 0) return <Typography variant="h6" textAlign="center">No items in cart</Typography>
        return (
            cartItems.map(cartItem => <ShoppingCartDrawerItem key={cartItem.pid} {...cartItem}/>)
        )
    }

    return (
        <Drawer
            anchor={"right"}
            open={isDrawerOpen}
            onClose={closeDrawer(false)}
            elevation={24}
            transitionDuration={{enter: 400, exit: 800}}
            /* when the Drawer starts to open, such as starting an animation, easier to maintain effect and state in the same Drawer component */
            onTransitionEnter={handleFetchCartItems}
        >
            <Typography variant="h4" textAlign="center" my={2}>Your Cart</Typography>
            <Divider/>
            <Box sx={{width: 350}} role="presentation">
                <List sx={{textAlign: "center"}}>
                    {renderDrawerContent()}
                </List>
                {cartItems && (cartItems as GetCartItemDto[]).length > 0
                    && <Button color="primary" variant="contained"
                               sx={{width: "100%", my: 2, letterSpacing: "1em"}}
                               onClick={() => navigate("/shoppingcart")}
                    >
                        Checkout
                    </Button>}
            </Box>
        </Drawer>
    )
};

export default ShoppingCartDrawer;