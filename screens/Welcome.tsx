import {
    StyleSheet,
    View,
    ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import ButtonLarge from "@/commons/ButtonLarge";
import { router } from "expo-router";
import { useThemeColor, useThemeMode } from "@/theme";


export default function Welcome() {
    const { gray0, gray1, gray2, icon, dark } = useThemeColor();
    const mode = useThemeMode();
    useEffect(()=>{
        // Wait for some time and to automatically load the page
        const timer = setTimeout(() => {
            router.replace('/(tabs)')
        }, 500);
        return ()=>{
            clearTimeout(timer)
        }
    },[])
    return (
        <ImageBackground
            source={require("../assets/images/splash.png")}
            style={styles.background}
            resizeMode="cover"
        >
            {/* <View style={styles.bottonContainer}>
                <ButtonLarge text="Take me home" onPress={goHome} />
            </View> */}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.dark,
        opacity: 0.9,
        paddingHorizontal: 15,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        marginBottom: "5%",
        width: "100%",
    },
});
