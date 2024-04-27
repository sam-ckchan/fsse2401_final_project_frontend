import {Fab, Stack} from '@mui/material';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {CartTableRowProps} from "../ShppingCartTableRow";
import * as cartItemApi from "../../../../../api/cartItemApi.ts"
import {useState} from "react";
import GradientCircularProgress from "../../../../component/GradientCircularProgress";
import DeleteDialog from "../DeleteDialog";
import {useCartItemContext} from "../../../../../context/CartItemProvider.tsx";

//  To reduce server workload, we update the previous fetch cartItems list (client-side) at <ShoppingCartPage>
//      instead of calling GET api to fetch new cartItems when quantity change
//          by settingCartItem(), the <ShoppingCartPage> JSX tree will rerender
//           Tradeoff: 1. Prop Drilling,
//           2. [BUG] when click add to cart item may exceed product stock, only 400 error return from server (can useContext or call GET api again to solve)

function CheckoutButtonGroup({cartItem, setCartItems, cartItems}: CartTableRowProps) {
    const {pid, cart_quantity} = cartItem

    const [isQuantPatching, setIsQuantPatching] = useState(false)
    const [isDelDialOpen, setIsDelDiaOpen] = useState(false)

    const {setCartCount} = useCartItemContext()

    const handleAdd = (type: string) => () => adjustCartItemQuantity(type)

    const handleMinus = (type: string) => () => adjustCartItemQuantity(type)

    const handleRemove = async () => {
        setIsQuantPatching(true)
        await cartItemApi.removeCartItem(pid)
        setCartItems(cartItems?.filter(cartItem => cartItem.pid !== pid))
        setCartCount(prevCount => prevCount - cartItem.cart_quantity)
        setIsQuantPatching(false) // optional, as the table row is unmounted
    };

    // helper function for +/- button
    const adjustCartItemQuantity = async (type: string) => {
        if (type == "minus" && cart_quantity == 1) {
            return setIsDelDiaOpen(true)
        }
        setIsQuantPatching(true)
        const newCartItems = cartItems?.map(cartItem => {
            if (cartItem.pid !== pid) return cartItem
            switch (type) {
                case "add":
                    if (cart_quantity >= cartItem.stock) break
                    cartItem.cart_quantity += 1
                    break
                case "minus":
                    if (cart_quantity <= 0) break
                    cartItem.cart_quantity -= 1
                    break
                default:
                    return cartItem
            }
            return cartItem
        })
        // client-side adjust cached quantity and rerender instead of calling GET api
        setCartItems(newCartItems)
        if (type == "add") {
            cartItemApi.patchCartItem(pid, cart_quantity + 1)
                .then(() => setCartCount(prevCount => prevCount + 1))
                .finally(() => setIsQuantPatching(false))
        }
        if (type == "minus") await cartItemApi.patchCartItem(pid, cart_quantity - 1)
            .then(() => setCartCount(prevCount => prevCount - 1))
            .finally(() => setIsQuantPatching(false))
    }


    return (
        <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
            <Fab color="primary" size="small" onClick={handleAdd("add")} disabled={isQuantPatching}>
                <AddIcon/>
            </Fab>
            <Typography px={1}>{isQuantPatching ? <GradientCircularProgress size={16}/> : cart_quantity}</Typography>
            <Fab color="secondary" size="small" onClick={handleMinus("minus")} disabled={isQuantPatching}>
                <RemoveIcon/>
            </Fab>
            {isQuantPatching
                ? <Typography px={1}>
                    <GradientCircularProgress size={16}/>
                </Typography>
                : <FontAwesomeIcon
                    icon={faTrashCan} size="xl"
                    style={{
                        color: "#d32f2f",
                        marginLeft: "40px",
                        cursor: "pointer",
                    }}
                    onClick={() => setIsDelDiaOpen(true)}
                />}
            <DeleteDialog isOpen={isDelDialOpen} setIsOpen={setIsDelDiaOpen} handleRemove={handleRemove}/>
        </Stack>
    )
}

export default CheckoutButtonGroup;
