import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from "react";
import * as cartItemApi from "../api/cartItemApi.ts"
import {useLoginUserContext} from "./LoginUserProvider.tsx";

type CartContextProps = {
    cartCount: number | undefined,
    setCartCount: Dispatch<SetStateAction<number>>
}

const CartItemContext = createContext<CartContextProps>({
    cartCount: 0,
    setCartCount() {
    }
})

export const CartItemProvider: FC<PropsWithChildren> = ({children}) => {
    const loginUser = useLoginUserContext()
    const [cartCount, setCartCount] = useState<number>(0)
    const value = {cartCount, setCartCount}
    useEffect(() => {
        const fetchCartItems = async () => {
            if (!loginUser) return setCartCount(0)
            const newCartItems = await cartItemApi.getCartItem().catch()
            const count = newCartItems?.reduce((prevNum, cartItem) => cartItem.cart_quantity + prevNum, 0) ?? 0
            setCartCount(count)
        }
        fetchCartItems().then()
    }, [loginUser])
    return (
        <CartItemContext.Provider value={value}>
            {children}
        </CartItemContext.Provider>
    )
}

export const useCartItemContext = () => useContext(CartItemContext)