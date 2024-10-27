import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import MainContainer from '@/components/MainContainer'
import trendData from '@/commons/data/trending-today'
import { AntDesign, EvilIcons } from '@expo/vector-icons'
import { fontSize } from '@/constants/FontSizes'
import { Colors } from '@/constants/Colors'
import { useThemeColor, useThemeMode } from '@/theme'


export default function Today({ todayPressed }: { todayPressed: () => void }) {
    const { dark, light } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            title: {
                color: mode === "light" ? dark : dark,
            },
            text: {
                color: mode === "light" ? dark : dark,
            },
            icon: {
                color: mode === "light" ? dark : dark,
            },
        }
    }, [mode])
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <MainContainer>
                {
                    trendData.map((item, index) => (
                        <View key={index} style={styles.gridContainer}>
                            <View style={styles.gridLeftImage}>
                                <Image
                                    source={item.image}
                                    style={{ width: '100%', height: 80, borderRadius: 10, position: "relative" }}
                                    resizeMethod='resize'
                                />
                            </View>
                            <View style={styles.gridRightItems}>
                                <View style={styles.titleWrap}>
                                    <Text style={[styles.title, style.title]}>{item.title}</Text>
                                </View>
                                <View style={styles.textWrap}>
                                    <Text style={[styles.text, style.text]}>{item.text}</Text>
                                </View>
                                <View style={styles.iconWrap}>
                                    <Text style={[styles.icon, style.icon]}><AntDesign name="eyeo" size={12} color={dark} /> 21,778</Text>
                                    <Text style={[styles.icon, style.icon]}><EvilIcons name="clock" size={12} color={dark} />2hrs ago</Text>
                                </View>
                            </View>
                        </View>
                    ))
                }
                <ActivityIndicator size="large" color={Colors.primary} />
            </MainContainer>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    gridLeftImage: {
        width: "40%",
    },
    gridRightItems: {
        width: "60%",
        paddingLeft: 10,
        height: 80,
    },
    titleWrap: {
        marginBottom: 5,
    },
    title: {
        fontSize: fontSize.normal,
        fontWeight: "bold",
    },
    textWrap: {
        marginBottom: 5,
    },
    text: {
        fontSize: fontSize.small,
    },
    iconWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 3,
    },
    icon: {
        fontSize: 10,
        color: "black",
    },
})