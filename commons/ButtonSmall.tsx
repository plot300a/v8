import { StyleSheet, View, Dimensions, Platform, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { fontSize } from "@/constants/FontSizes";
import { Text } from "@/theme";

const { height: Height } = Dimensions.get("window");
let top;
if (Platform.OS === "ios") {
    top = Height * 0.02;
} else {
    top = 15;
}

interface MainContainerProps {
    onPress?: () => void;
    text?: string;
    loadingComponent?: JSX.Element | string | null | undefined;
    style?: StyleProp<ViewStyle>;
    textstyle?: StyleProp<ViewStyle>;
}
const ButtonSmall: React.FC<MainContainerProps> = ({ onPress, text, loadingComponent, style, textstyle }) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
            <LinearGradient
                colors={['#EF9700', '#F75211', '#FB1563']}
                style={styles.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                {loadingComponent ? loadingComponent : <Text style={[styles.text, textstyle]}>{text}</Text>}

            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        marginTop: 20,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        color: Colors.light,
        fontSize: fontSize.normal,
        fontWeight: "bold",
    },
});

export default ButtonSmall;