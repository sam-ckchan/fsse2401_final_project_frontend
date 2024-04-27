import {Avatar, TableCell, TableRow} from "@mui/material";
import {GetCartItemDto} from "../../../../../data/cartItem/cartItem.type.ts";
import CheckoutButtonGroup from "../CheckoutButtonGroup/index.tsx";
import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction} from "react";

export type CartTableRowProps = {
    cartItems: GetCartItemDto[] | undefined,
    setCartItems: Dispatch<SetStateAction<GetCartItemDto[] | undefined>>,
    cartItem: GetCartItemDto
}

const ShoppingCartTableRow = ({cartItem, cartItems, setCartItems}: CartTableRowProps) => {
    const {name, price, image_url, cart_quantity, pid} = cartItem
    const navigate = useNavigate()
    return (
        <TableRow>
            <TableCell>
                <Avatar alt={name} src={image_url} variant="square"
                        sx={{width: "70px", height: "60px", cursor: "pointer"}}
                        onClick={() => navigate(`/product/${pid}`)}
                />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>${price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</TableCell>
            <TableCell>
                <CheckoutButtonGroup setCartItems={setCartItems} cartItems={cartItems} cartItem={cartItem}/>
            </TableCell>
            <TableCell>
                ${(price * cart_quantity).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}
            </TableCell>
        </TableRow>
    )
};

export default ShoppingCartTableRow;