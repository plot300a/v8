import { Text, useThemeColor } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";


type Props = {
    active: boolean; title: string; onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
}
export const ToggleableButton = ({ active, title, onPress, style, textStyle, loading }: Props) => {
    const { gray0, white } = useThemeColor()


    if (active) {
        return (
            <TouchableOpacity onPress={onPress}>
                <LinearGradient
                    colors={['#EF9700', '#F75211', '#FB1563']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.navButton, style, { backgroundColor: gray0 }]}
                >
                    {
                        loading ?
                            <ActivityIndicator size={'small'} color={'#ffffff'} />
                            :
                            <Text style={[textStyle, { color: '#ffffff' }]}>{title}</Text>
                    }

                </LinearGradient>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.navButton, style, { backgroundColor: gray0 }]}>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    navButton: {
        marginHorizontal: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
});