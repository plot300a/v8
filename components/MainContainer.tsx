import { StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/theme";


interface MainContainerProps {
    children: ReactNode;
}
const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    const { background } = useThemeColor()
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: background, }]}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
});

export default MainContainer;