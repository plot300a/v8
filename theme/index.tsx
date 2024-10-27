import { JSX, ReactNode, createContext, useContext, useMemo, useState } from "react";
import { TextProps } from "react-native";
import { ReactNativeText } from "./comps";
import { Theme, ThemeColors, ThemeMode } from "./themes";
import { fontSize } from "@/constants/FontSizes";



const getTheme = (mode: ThemeMode) => {
    return (
        mode === 'dark' ? {
            mode: 'dark',
            colors: Theme.dark
        } : {
            mode: 'light',
            colors: Theme.light
        }
    ) as { colors: ThemeColors, mode: ThemeMode }
}
const defaultTheme = getTheme(Theme.mode);
const ThemeContext = createContext(defaultTheme);
export const useThemeColor = () => {
    const { colors } = useContext(ThemeContext);
    return colors;
}

export const useThemeMode = () => {
    const { mode } = useContext(ThemeContext);
    return mode;
}
let modeSetter: React.Dispatch<React.SetStateAction<{ colors: ThemeColors, mode: ThemeMode }>> = ((mode: ThemeMode) => { }) as any;
export const setThemeMode = (mode: ThemeMode) => {
    const selectLight = mode === 'light';
    const selectDark = mode === 'dark';
    // Set to default if provided mode is not supported
    if (!(selectLight || selectDark)) {
        mode = 'light';
    }
    modeSetter(getTheme(mode));
}

export function Text(props: TextProps) {
    const { dark } = useThemeColor();
    const style = useMemo(()=>{
        return [{ color: dark, fontSize: fontSize.normal }, props.style]
    },[dark,props.style])
    return <ReactNativeText {...props} style={style} />;
}

export const AppThemeProvider = ({ children }: { children: ReactNode | JSX.Element }) => {
    const [currentTheme, setMode] = useState<{ colors: ThemeColors, mode: ThemeMode }>(defaultTheme)
    modeSetter = setMode;
    return <ThemeContext.Provider value={currentTheme}>{children}</ThemeContext.Provider>
}
