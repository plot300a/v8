import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

const { height: Height } = Dimensions.get("window");
let top;
if (Platform.OS === "ios") {
    top = Height * 0.02;
} else {
    top = 15;
}

interface MainContainerProps {
    children: ReactNode;
}
const SubContainer: React.FC<MainContainerProps> = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
    },
    content: {
        flex: 1,
        marginTop: top,
        backgroundColor: Colors.light,
        // marginHorizontal: 15,
        paddingBottom: Height * 0.11,
    },
});

export default SubContainer;