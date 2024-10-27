import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { fontSize } from "@/constants/FontSizes";
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import trendData from "@/commons/data/trends-data";
import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { useThemeColor, useThemeMode } from "@/theme";


export default function ViralShowcase({ viralPressed }: { viralPressed: () => void }) {
    const { dark } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            headerText: {
                color: mode === "light" ? dark : dark,
            },
            gridText: {
                color: mode === "light" ? dark : dark,
            },
        }
    }, [mode])
    return (
        <View>
            <View style={styles.header}>
                <View>
                    <Text style={[style.headerText, styles.headerText]}>Viral Showcase</Text>
                </View>
            </View>
            <View style={styles.viewContainer}>
                <View style={styles.playIcon}>
                    <AntDesign name="play" size={60} color="grey" />
                </View>
                <Image
                    source={require('../../assets/images/trend-video.png')}
                    style={{ width: '100%', height: 200, borderRadius: 10, position: "relative" }}
                />
                <View style={styles.bottomBg}>
                    <View style={styles.textContainer}>
                        <Text style={styles.font}>COCO JONES, BEYONCÉ, SZA, KENDRICK LAMAR,</Text>
                        <Text style={styles.font}>AND LATTO AMONG 2023 BET AWARDS WINNERS</Text>
                    </View>
                    <View style={styles.countContainer}>
                        <Text style={styles.icon}><AntDesign name="eyeo" size={12} color="white" /> 21,778</Text>
                        <Text style={styles.icon}><EvilIcons name="clock" size={12} color="white" />2hrs ago</Text>
                    </View>
                </View>
            </View>
            {/* data */}
            <View style={styles.gridData}>
                {trendData.map((item, index) => (
                    <View key={index} style={styles.gridItem}>
                        <Image source={item.image} style={styles.gridImage} />
                        <Text style={[styles.gridText, style.gridText]}>{item.text}</Text>
                        <Text style={[styles.gridText, style.gridText]}>{item.text}</Text>
                    </View>
                ))}
            </View>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 10,
    },
    headerText: {
        fontSize: fontSize.medium,
        fontWeight: "bold",
    },
    viewContainer: {
        backgroundColor: "#1A1A1A",
    },
    playIcon: {
        position: "absolute",
        top: 60,
        left: "45%",
        zIndex: 1,
    },
    bottomBg: {
        position: "absolute",
        backgroundColor: "#1A1A1A",
        bottom: 0,
        width: "100%",
        padding: 10,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        height: "auto",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        // padding: 5,
        width: "70%",
    },
    countContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "30%",
    },
    font: {
        fontSize: 9,
        color: "white",
    },
    icon: {
        fontSize: 10,
        color: "white",
    },
    gridData: {
        marginTop: fontSize.medium,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
    },
    gridItem: {
        width: "30%", // for three columns
        // width: "48%", // for two columns
        marginBottom: 10,
    },
    gridImage: {
        width: "100%",
        height: 100,
        borderRadius: 10,
    },
    gridText: {
        fontSize: 9,
        color: Colors.dark,
    },
});


