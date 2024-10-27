import {
    Image,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, useThemeColor } from "@/theme";
import { CustomNavigator } from "./Navigator";
import { fontSize } from "@/constants/FontSizes";

type HeaderProps = {
    /**
     * Perform some task right before the `router.back()` is invoked. Return a **`falsy`** value to stop
     * the invoke of `router.back()`
     */
    beforeBack?: () => boolean;
    /** Header title  */
    title?: string;
};

export default function CustomHeader({ beforeBack, title }: HeaderProps) {
    const { dark } = useThemeColor();
    const handleBackPress = () => {
        const shouldReallyGoBack = beforeBack ? !!beforeBack() : true;
        shouldReallyGoBack && CustomNavigator.goBack();
    };
    return (
        <View style={styles.headerContainer}>
            <View>
                <Pressable onPress={handleBackPress}>
                    <Ionicons name="chevron-back" size={24} color={dark} />
                </Pressable>
            </View>
            <View>
                <Text testID="screen-title" style={styles.logo}>{title}</Text>
            </View>
            <View>
                <Image
                    source={require("../assets/images/user.png")}
                    style={styles.image}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    logo: {
        fontSize: fontSize.medium,
        fontWeight: "bold",
    },
});
