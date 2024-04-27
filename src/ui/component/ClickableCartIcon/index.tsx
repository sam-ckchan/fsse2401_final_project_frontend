import {CSSProperties} from "react";
import {ShoppingCartDrawerProps} from "../ShoppingCartDrawer";
import {CartPlusIcon} from "./component/CartPlusIcon";
import {CartShoppingIcon} from "./component/CartShoppingIcon";

export type AdditionProps =
    { style?: CSSProperties, type?: string, to?: string, pid?: number }
    & ShoppingCartDrawerProps

const ClickableCartIcon = ({style, type = "plus", to = "/#", pid, setIsDrawerOpen}: AdditionProps) => {
    if (type === "shopping")
        return <CartShoppingIcon style={style} to={to} setIsDrawerOpen={setIsDrawerOpen}/>
    if (type === "plus")
        return <CartPlusIcon style={style} pid={pid}/>
};


export default ClickableCartIcon;