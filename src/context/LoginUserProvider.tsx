import {createContext, FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import {User} from "firebase/auth";
import * as FirebaseAuthService from "../authService/firebaseAuthService.ts";


// undefined = refresh (api result not return yet)
// null = no login user (when logout firebase observer change to null)
// User = login user present (when login firebase observer change to User)
const LoginUserContext = createContext<User | null | undefined>(null)

export const LoginUserProvider: FC<PropsWithChildren> = ({children}) => {
    const [loginUser, setLoginUser] = useState<User | null | undefined>(undefined)
    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser)

    }, [])
    return (
        <LoginUserContext.Provider value={loginUser}>
            {children}
        </LoginUserContext.Provider>
    );
};

export const useLoginUserContext = () => useContext(LoginUserContext);
