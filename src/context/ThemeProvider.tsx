import React, {createContext, FC, PropsWithChildren, useContext, useState} from "react";

type ThemeContextType = {
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> | null,
    isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType>({
    setIsDarkMode: null,
    isDarkMode: false
})

const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const value = {setIsDarkMode, isDarkMode}
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}
export default ThemeProvider;
export const useThemeContext = () => useContext(ThemeContext)
