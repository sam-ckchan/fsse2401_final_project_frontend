import {createBrowserRouter} from "react-router-dom";
import BadRequestPage from "../ui/page/BadRequestPage";


const router = createBrowserRouter([
    {
        path: "/",
        async lazy() {
            const {ProductListPage} = await import("../ui/page/ProductListPage");
            return {Component: ProductListPage};
        },
        errorElement: <BadRequestPage/>
    },
    {
        path: "/product/:productId",
        async lazy() {
            const {ProductDetailPage} = await import("../ui/page/ProductDetailPage");
            return {Component: ProductDetailPage};
        },
        errorElement: <BadRequestPage/>
    },
    {
        path: "/shoppingcart",
        lazy: async function () {
            const {ShoppingCartPage} = await import("../ui/page/ShoppingCartPage")
            return {Component: ShoppingCartPage}
        },
        errorElement: <BadRequestPage/>
    },
    {
        path: "/login",
        async lazy() {
            const {LoginPage} = await import("../ui/page/LoginPage")
            return {Component: LoginPage}
        },
        errorElement: <BadRequestPage/>
    },
    {
        path: "/checkout/:transactionId",
        async lazy() {
            const {CheckoutPage} = await import("../ui/page/CheckoutPage")
            return {Component: CheckoutPage}
        },
        errorElement: <BadRequestPage/>
    },
    {
        path: "/thankyou",
        lazy: async function () {
            const {ThankyouPage} = await import("../ui/page/ThankyouPage")
            return {Component: ThankyouPage}
        },
        errorElement: <BadRequestPage/>

    },
    {
        path: "/error",
        element: <BadRequestPage/>
    }
])

export default router