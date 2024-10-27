import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { Video, ResizeMode } from "expo-av";
import ButtonLarge from "@/commons/ButtonLarge";
import { fontSize } from "@/constants/FontSizes";
import { Colors } from "@/constants/Colors";
import { useThemeColor, useThemeMode } from "@/theme";

const VideoPlayer = ({
    videoUri,
    onUploadClick,
    onchangeVideo,
}: {
    videoUri: string;
    onUploadClick: any;
    onchangeVideo: any;
}) => {
    const { dark, gray0, gray1, } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            description: {
                color: mode === "light" ? gray0 : gray0,
            },
            descriptionText: {
                color: mode === "light" ? gray1 : gray1,
            }
        }
    }, [mode])

    return (
        <>
            {
                videoUri ? (
                    <View style={styles.description}>
                        <Text style={[styles.descriptionText, style.descriptionText]}>Tap on the selected video to change video</Text>
                    </View>
                ) : (
                    <View style={styles.description}>
                        <Text style={[styles.descriptionText, style.descriptionText]}>Tap on the button to select a video for upload</Text>
                    </View>
                )
            }

            <TouchableOpacity onPress={onchangeVideo}>
                {videoUri ? (
                    <View style={styles.videoContainer}>
                        <Video
                            style={[styles.video]}
                            source={{ uri: videoUri }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode={ResizeMode.COVER}
                            shouldPlay
                        />
                    </View>
                ) : (
                    <ButtonLarge onPress={onUploadClick} text="Add Video" />
                )}
            </TouchableOpacity>
        </>
    );
};

export const VideoPlaceholder = () => {
    return (
        <View style={{ marginTop: 10 }}>
            <View
                style={{
                    backgroundColor: "gray",
                    width: "100%",
                    height: 300,
                }}
            ></View>
        </View>
    );
};

export const VideoPlaceHolderIcon = () => {
    const { dark, gray0, gray1, link } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            uploadContainer: {
                backgroundColor: mode === "light" ? gray0 : gray0,
            },
            uploadIcon: {
                color: mode === "light" ? gray1 : gray1,
            }
        }
    }, [mode])
    return (
        <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
            <View style={[styles.uploadContainer, style.uploadContainer]}>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../../assets/images/video.png')}
                    resizeMode='contain'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    videoContainer: {
        height: 300,
        width: "auto"
        // flex: 1,
        // marginTop: 20,
        // justifyContent: "center",
        // alignItems: "center"
    },
    video: {
        marginTop: 20,
        width: "100%",
        height: 300,
    },
    uploadContainer: {
        height: 200,
        width: 200,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
    },
    uploadIcon: {
        backgroundColor: Colors.link,
        padding: 7,
        borderRadius: 50,
        position: "absolute",
        bottom: -10,
        // left: '85%',
        left: '65%',
    },
    description: {
        justifyContent: "center", alignItems: "center", marginTop: 10
    },
    descriptionText: {
        fontSize: fontSize.normal, fontWeight: "600"
    }
});

export default VideoPlayer;
