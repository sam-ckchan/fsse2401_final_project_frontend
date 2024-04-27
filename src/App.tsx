import {RouterProvider} from "react-router-dom";
import router from "./config/RouterConfig.tsx"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import {LoginUserProvider} from "./context/LoginUserProvider.tsx";
import {CartItemProvider} from "./context/CartItemProvider.tsx";


export default function App() {
    return (
        <LoginUserProvider>
            <CartItemProvider>
                <RouterProvider router={router}/>
            </CartItemProvider>
        </LoginUserProvider>
    )
}
