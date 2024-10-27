import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
} from "react-native";
import React, { useState } from "react";
// import SubContainer from '@/components/SubContainer'
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { fontSize } from "@/constants/FontSizes";
import ButtonLarge from "@/commons/ButtonLarge";
import ImageLargeButton from "@/commons/ImageLargeButton";
import { showMessage } from "react-native-flash-message";
import { Link, router } from "expo-router";
import { Login } from "@/components/registration/Login";
import { Signup } from "@/components/registration/Signup";
import MainContainer from "@/components/MainContainer";
import { Text, useThemeColor, useThemeMode } from "@/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetModalComponent from "@/commons/BottomSheetModal";
import VideoPost from "@/components/post/video";
import PicturePost from "@/components/post/picture";
import AudioPost from "@/components/post/audio";
import TextPost from "@/components/post/text";
import VideooPost from "@/components/post/videoo";

export default function CreatePost() {
    const mode = useThemeMode();
    const Colors = useThemeColor();
    const { background } = Colors;
    const [currentScreen, setCurrentScreen] = useState<
        "video" | "audio" | "picture" | "text"
    >("video");

    const toggleScreen = () => {
        switch (currentScreen) {
            case "video":
                setCurrentScreen("text");
                break;
            case "audio":
                setCurrentScreen("picture");
                break;
            case "picture":
                setCurrentScreen("video");
                break;
            case "text":
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
        borderColor: Colors.light,
    };

    const isAudioScreen = currentScreen === "audio";

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.toggleContainer,
                    styles.buttonGroup,
                    {
                        borderColor: Colors.gray0,
                        borderWidth: mode === "dark" ? 2 : 1,
                    },
                ]}
            >
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
                        currentScreen === "audio"
                            ? activeButtonStyle
                            : nonActiveButtonStyle,
                    ]}
                    onPress={() => setCurrentScreen("audio")}
                >
                    <Text
                        style={{
                            color:
                                currentScreen === "audio" ? Colors.secondary : Colors.gray1,
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
                        currentScreen === "text" ? activeButtonStyle : nonActiveButtonStyle,
                    ]}
                    onPress={() => setCurrentScreen("text")}
                >
                    <Text
                        style={{
                            color: currentScreen === "text" ? Colors.secondary : Colors.gray1,
                        }}
                    >
                        Text
                    </Text>
                </TouchableOpacity>
            </View>
            {currentScreen === "video" && <VideoPost videoPressed={toggleScreen} />}
            {/* {currentScreen === "video" && <VideooPost videoPressed={toggleScreen} />} */}
            {currentScreen === "audio" && <AudioPost audioPressed={toggleScreen} />}
            {currentScreen === "picture" && (
                <PicturePost picturePressed={toggleScreen} />
            )}
            {currentScreen === "text" && <TextPost textPressed={toggleScreen} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 10,
        marginBottom: "20%",
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        width: "100%",
    },
    buttonGroup: {
        marginTop: fontSize.normal,
        borderWidth: 1,
        borderRadius: 6,
        width: "100%",
        alignSelf: "center",
    },
    navButton: {
        borderWidth: 1,
        padding: 15,
        paddingVertical: 7,
        borderRadius: 6,
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
    },
});
