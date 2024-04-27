import {useEffect, useRef, useState} from "react";
import {useCartItemContext} from "../../../../../context/CartItemProvider.tsx";
import * as cartItemApi from "../../../../../api/cartItemApi.ts";
import PubSub from "pubsub-js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {Alert, Snackbar} from "@mui/material";
import {AdditionProps} from "../../index.tsx";

export const CartPlusIcon = ({style, pid}: AdditionProps) => {
    const [bounce, setBounce] = useState(false)
    const bounceTimerId = useRef(0)
    const [showAddToCartAlert, setShowAddToCartAlert] = useState(false)
    const alertTimer = useRef(0);
    // [BugFix] when clicking too fast, two cart item with same pid will be added separately in DB as 2 row --> break db
    const isPuttingCartItem = useRef(false)

    const {setCartCount} = useCartItemContext()

    const handleClick = async () => {
        if (isPuttingCartItem.current) return
        clearTimeout(bounceTimerId.current)
        setBounce(true)
        bounceTimerId.current = window.setTimeout(() => setBounce(false), 500)
        if (!pid) return
        isPuttingCartItem.current = true
        await cartItemApi.putCartItem(pid, 1)
            .then(() => setCartCount(prevCount => prevCount + 1))
            .catch(err => {
                if (err.toString().includes("authentication required")) {
                    setShowAddToCartAlert(true)
                    alertTimer.current = window.setTimeout(() => setShowAddToCartAlert(false), 5000)
                }
            })
            .finally(() => isPuttingCartItem.current = false)
    }
    // outer container trigger animation in product detail page's addToCart
    useEffect(() => {
        const subToken = PubSub.subscribe("AnimationTrigger", handleClick)
        return () => {
            PubSub.unsubscribe(subToken)
        }
    }, []);
    return (
        <>
            <FontAwesomeIcon
                icon={faCartPlus}
                size="lg"
                style={{color: "#729cfd", cursor: "pointer", ...style}}
                bounce={bounce}
                onClick={handleClick}
            />{<Snackbar open={showAddToCartAlert}
                         anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
            <Alert severity="error">Sign in to use cart</Alert></Snackbar>}
        </>
    );
};
