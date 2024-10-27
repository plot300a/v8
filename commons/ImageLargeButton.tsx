import { StyleSheet, Text, View, Dimensions, Platform, TouchableOpacity, Image } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { fontSize } from "@/constants/FontSizes";

const { height: Height } = Dimensions.get("window");
let top;
if (Platform.OS === "ios") {
    top = Height * 0.02;
} else {
    top = 15;
}

interface MainContainerProps {
    onPress: () => void;
    text: string;
}
const ImageLargeButton: React.FC<MainContainerProps> = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Image source={require('../assets/images/google-icon.png')} style={styles.image} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: Colors.gray,
    },
    buttonText: {
        color: Colors.light,
        fontSize: 20,
        fontWeight: "bold",
    },
    text: {
        color: Colors.dark,
        fontSize: fontSize.normal,
        fontWeight: "bold",
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
});

export default ImageLargeButton;