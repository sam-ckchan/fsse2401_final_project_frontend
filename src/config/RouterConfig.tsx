import {createBrowserRouter} from "react-router-dom";
import ProductListingPage from "../ui/page/ProductListPage";
import BadRequestPage from "../ui/page/BadRequestPage";
import ProductDetailPage from "../ui/page/ProductDetailPage";
import LoginPage from "../ui/page/LoginPage";
import ShoppingCartPage from "../ui/page/ShoppingCartPage";
import CheckoutPage from "../ui/page/CheckoutPage";
import ThankyouPage from "../ui/page/ThankyouPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductListingPage/>,
        errorElement: <BadRequestPage/>
    },
    {
        path: "/product/:productId",
        element: <ProductDetailPage/>,
        errorElement: <BadRequestPage/>
    },
    {
        path: "/shoppingcart",
        element: <ShoppingCartPage/>,
        errorElement: <BadRequestPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <BadRequestPage/>
    },
    {
        path: "/checkout/:transactionId",
        element: <CheckoutPage/>,
        errorElement: <BadRequestPage/>
    },
    {
        path: "/thankyou",
        element: <ThankyouPage/>
    },
    {
        path: "/error",
        element: <BadRequestPage/>
    }
])

export default router