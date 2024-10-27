import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { fontSize } from '@/constants/FontSizes'
import { useThemeColor, useThemeMode } from '@/theme'

export default function VersessLogo() {
    const { dark } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            logo: {
                color: mode === "light" ? dark : dark,
                fontSize: fontSize.medium,
            }
        }
    }, [mode])
    return (
        <View>
            <Text style={[style.logo, styles.logo]}>VeRsEsS</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        fontSize: fontSize.medium,
        fontWeight: "bold",
    },
})