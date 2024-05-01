import {RouterProvider} from "react-router-dom";
import router from "./config/RouterConfig.tsx"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import {LoginUserProvider} from "./context/LoginUserProvider.tsx";
import {CartItemProvider} from "./context/CartItemProvider.tsx";
import {ThemeProvider} from "@mui/material";
import {theme} from "./context/ThemeContext.tsx"
import {Suspense} from "react";
import GradientCircularProgress from "./ui/component/GradientCircularProgress";


export default function App() {
    return (
        <LoginUserProvider>
            <CartItemProvider>
                <ThemeProvider theme={theme}>
                    <Suspense fallback={<GradientCircularProgress size={"10rem"}/>}>
                        <RouterProvider router={router}/>
                    </Suspense>
                </ThemeProvider>
            </CartItemProvider>
        </LoginUserProvider>
    )
}

// <Suspense> lets you display a fallback until its children have finished loading.
