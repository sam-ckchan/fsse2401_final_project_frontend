import QuantityButton from "../QuantityButton";
import {Dispatch, SetStateAction, useRef, useState} from 'react';
import ClickableCartIcon from "../../../../component/ClickableCartIcon";
import {GetProductDto} from "../../../../../data/product/product.type.ts";
import * as cartItemApi from "../../../../../api/cartItemApi.ts"
import {Alert, Button, CircularProgress, Snackbar} from "@mui/material";
import {useCartItemContext} from "../../../../../context/CartItemProvider.tsx";


export type DescProps = {
    onQuant: number,
    onAdd: () => void,
    onRemove: () => void,
    onSetOrderedQuant: Dispatch<SetStateAction<number>>
} & GetProductDto


const Description = ({stock, description, pid, name, price}: GetProductDto) => {
    const [quant, setQuant] = useState<number>(1);
    const [showAddToCartAlert, setShowAddToCartAlert] = useState(false)
    const [isAddingCart, setIsAddingCart] = useState(false)

    const {setCartCount} = useCartItemContext()

    const alertTimer = useRef(0);

    const handleAddToCartOnClick = async () => {
        PubSub.publish("AnimationTrigger")
        setIsAddingCart(true)
        clearTimeout(alertTimer.current)
        try {
            await cartItemApi.putCartItem(pid, quant)
            setCartCount(prevCount => prevCount + quant)
        } catch (err) {
            if ((err as Error).message.includes("authentication required")) {
                setShowAddToCartAlert(true)
                alertTimer.current = window.setTimeout(() => setShowAddToCartAlert(false), 5000)
            }
            console.warn(err)
        } finally {
            setIsAddingCart(false)
        }
    }

    const addQuant = () => {
        if (stock > quant) {
            setQuant(prevQuant => {
                return prevQuant + 1
            });
        }
    }

    const removeQuant = () => {
        if (quant > 1) {
            setQuant(prevQuant => prevQuant - 1);
        }
    }

    return (
        <section className="description">
            <p className="pre">Crewcut Shop</p>
            <h1>{name}</h1>
            <p className="desc">{description}</p>
            <div className="price">
                <div className="main-tag">
                    <p>$ {price.toLocaleString()}</p>
                    <p>50%</p>
                </div>
                <s>$ {(price / 0.5).toLocaleString()}</s>
            </div>
            {!!stock && <div className="buttons">
                <QuantityButton onQuant={quant} onRemove={removeQuant} onAdd={addQuant}/>
                {<Button className="add-to-cart" onClick={handleAddToCartOnClick} disabled={isAddingCart}>
                    {isAddingCart
                        ? <CircularProgress/>
                        : <><ClickableCartIcon style={{color: "white"}}/>
                            <span> add to cart</span></>
                    }
                </Button>}
            </div>}
            {<Snackbar open={showAddToCartAlert}
                       anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                <Alert severity="error">Sign in to use cart</Alert></Snackbar>}
        </section>
    );
};

export default Description;
