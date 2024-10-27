import { Colors } from "@/constants/Colors";
import { fontSize } from "@/constants/FontSizes";
import { Text, useThemeColor, useThemeMode } from "@/theme";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const TrendsButtons = () => {
    const mode = useThemeMode();
    const Colors = useThemeColor();
    const { background } = Colors;
    const [currentScreen, setCurrentScreen] = useState<
        "video" | "music" | "picture" | "viral"
    >("video");

    const toggleScreen = () => {
        switch (currentScreen) {
            case "video":
                setCurrentScreen("music");
                break;
            case "music":
                setCurrentScreen("picture");
                break;
            case "picture":
                setCurrentScreen("video");
                break;
            case "viral":
                setCurrentScreen("video");
                break;
            default:
                break;
        }
    };

    const activeButtonStyle = {
        backgroundColor: Colors.lightPrimary,
        borderWidth: 1,
        borderColor: Colors.secondary,
    };
    const nonActiveButtonStyle = {
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.gray0,
    };

    const isAudioScreen = currentScreen === "music";
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{
            padding: 5,
            backgroundColor: background,
        }}>
            <View
                style={[
                    styles.toggleContainer,
                    styles.buttonGroup,
                    {
                        borderColor: Colors.gray0,
                        // borderWidth: mode === "dark" ? 2 : 1,
                    },
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        {
                            backgroundColor: "#2E2E2E",
                        }
                    ]}
                    onPress={() => { }}
                >
                    <Text
                        style={{
                            color: Colors.light,
                        }}
                    >
                        Filter by
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        currentScreen === "video"
                            ? activeButtonStyle
                            : nonActiveButtonStyle,
                    ]}
                    onPress={() => setCurrentScreen("video")}
                >
                    <Text
                        style={{
                            color:
                                currentScreen === "video" ? Colors.secondary : Colors.gray1,
                        }}
                    >
                        Video
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        currentScreen === "music"
                            ? activeButtonStyle
                            : nonActiveButtonStyle,
                    ]}
                    onPress={() => setCurrentScreen("music")}
                >
                    <Text
                        style={{
                            color:
                                currentScreen === "music" ? Colors.secondary : Colors.gray1,
                        }}
                    >
                        Audio
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        currentScreen === "picture"
                            ? activeButtonStyle
                            : nonActiveButtonStyle,
                    ]}
                    onPress={() => setCurrentScreen("picture")}
                >
                    <Text
                        style={{
                            color:
                                currentScreen === "picture" ? Colors.secondary : Colors.gray1,
                        }}
                    >
                        Picture
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        currentScreen === "viral"
                            ? activeButtonStyle
                            : nonActiveButtonStyle,
                    ]}
                    onPress={() => setCurrentScreen("viral")}
                >
                    <Text
                        style={{
                            color:
                                currentScreen === "viral" ? Colors.secondary : Colors.gray1,
                        }}
                    >
                        Viral Showcase
                    </Text>
                </TouchableOpacity>
            </View>
            {/* {currentScreen === "video" && <VideoPost videoPressed={toggleScreen} />}
            {currentScreen === "audio" && <AudioPost audioPressed={toggleScreen} />}
            {currentScreen === "picture" && (
                <PicturePost picturePressed={toggleScreen} />
            )} */}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: "row",
    },
    buttonGroup: {
        marginLeft: -5,
    },
    navButton: {
        margin: 5,
        padding: 10,
        paddingVertical: 7,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
});
