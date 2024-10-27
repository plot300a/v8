import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import audioData from "@/commons/data/postData/audioData";
import ButtonSmall from "@/commons/ButtonSmall";
import { useThemeColor, useThemeMode } from "@/theme";
import { Colors } from "@/constants/Colors";
import Checkbox from 'expo-checkbox';

export default function SongList() {
    const [visible, setVisible] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const { gray0, gray1, gray2, background, light, dark, link } = useThemeColor();
    const mode = useThemeMode();
    const handleSheet = () => {
        setVisible(true);
    };
    const handleCloseSheet = () => {
        setVisible(false);
    };

    const style = useMemo(() => {
        return {
            header: {
                color: mode === "light" ? dark : dark,
            },
        }
    }, [mode])
    return (
        <View style={styles.container}>

            {visible ? (
                <View style={styles.contentContainer}>
                    <ScrollView
                        contentContainerStyle={{
                            paddingVertical: 20,

                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        {audioData.map((item, index) => (
                            <View key={index} style={styles.cardContainer}>
                                <View style={styles.cardLeftItems}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={item.icon}
                                            style={styles.image}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={{ marginLeft: 10, }}>
                                        <View>
                                            <Text style={{
                                                color: mode === "light" ? dark : dark,
                                                fontSize: 10,
                                                fontWeight: "bold",

                                            }}>{item.song}</Text>
                                        </View>
                                        <Text style={styles.sizeText}>{item.size}</Text>
                                        <View style={styles.progress}><Text>{item.size}</Text></View>
                                    </View>
                                </View>
                                <View style={styles.cardRightItems}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={item.isChecked}
                                        onValueChange={setChecked}
                                        color={item.isChecked ? "#F92F40" : undefined}
                                    />
                                </View>
                            </View>
                        ))}
                        <View>
                            <ButtonSmall text='Complete' onPress={handleCloseSheet} />
                        </View>
                    </ScrollView>
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <Text style={[styles.header, style.header]}>Upload New Audio File</Text>
                    <View style={styles.button}>
                        <ButtonSmall text='Upload' onPress={handleSheet} />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        // backgroundColor: "pink",
    },
    contentContainer: {
        marginHorizontal: 10,
    },
    imageContainer: {
        width: 30,
        height: 30,
        backgroundColor: "#F92F40",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 15,
        height: 15,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },
    button: {
        width: "50%",
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "#F92F40",
        borderWidth: 1,

    },
    cardLeftItems: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardRightItems: {
        flexDirection: "row",
        alignItems: "center",
    },
    sizeText: {
        color: "gray",
        fontSize: 8,
    },
    progress: {
        width: 100,
        height: 1,
        backgroundColor: "#F92F40",
        borderRadius: 5,
        marginTop: 5,
    },
    checkbox: {
        margin: 8,
        borderRadius: 50,
        borderWidth: 1,
        height: 15,
        width: 15,
        color: '#F92F40'
    },

});
