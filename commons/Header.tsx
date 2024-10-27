import { fontSize } from "@/constants/FontSizes";
import { Ionicons } from "@expo/vector-icons"
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native"
import { CustomNavigator } from "./Navigator";
import { isAndroid, screenHeight } from "@/constants/Window";
import { Text, useThemeColor } from "@/theme";

type HeaderProps = {
    /**
     * Perform some task right before the `router.back()` is invoked. Return a **`falsy`** value to stop 
     * the invoke of `router.back()`
     */
    beforeBack?: () => boolean;
    /** Header title  */
    title?: string;
}
export const CustomNavigationHeader = ({ beforeBack, title }: HeaderProps) => {
    const { background, dark } = useThemeColor();
    const handleBackPress = () => {
        const shouldReallyGoBack = beforeBack ? !!beforeBack() : true;
        shouldReallyGoBack && CustomNavigator.goBack();
    }

    return (
        <SafeAreaView style={[styles.headerContainer, { backgroundColor: background,}]}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Pressable onPress={handleBackPress}>
                        <Ionicons name="chevron-back-sharp" size={27} color={dark} />
                    </Pressable>
                </View>
                <View>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
                <View></View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        marginTop: isAndroid ? 17 : (screenHeight * 0.012),
    },
    container: {
        marginTop: isAndroid ? 15 : (screenHeight * 0.012),
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: 50,
    },
    title: {
        fontSize: fontSize.medium,
        fontWeight: "bold",
    },
});