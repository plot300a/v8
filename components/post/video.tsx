import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-media-library";
import { getMediaContent, useMediaPermissions } from "@/commons/FilePicker";
import { useThemeColor } from "@/theme";
import { getServerEndpoint } from "@/commons/server/routes";
import { ToggleableButton } from "@/commons/ButtonToggler";
import * as MediaLibrary from "expo-media-library";
import { VideoPlay } from "../home";
import { CustomImageComponent } from "@/commons/Image";
import { Video, ResizeMode } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import ButtonLarge from "@/commons/ButtonLarge";
import VideoPlayer, { VideoPlaceholder, VideoPlaceHolderIcon } from "../home/VideoPlayer";
import ButtonSmall from "@/commons/ButtonSmall";
import { router } from "expo-router";

export default function VideoPost({
    videoPressed,
}: {
    videoPressed: () => void;
}) {
    const [video, setVideo] = useState<ImagePicker.ImagePickerAsset | null>(null);

    const [displayedItem, setDisplayedItem] = useState<Asset | null>(null);

    const mediaPermissions = useMediaPermissions();
    const { gray0 } = useThemeColor();
    const [uploading, setUploading] = useState(false);

    const onVideoSelect = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                // allowsEditing: true,
                // aspect: [4, 4],
                quality: 1,
            });
            if (!result.canceled) {
                setVideo(result.assets[0]);
            }
            console.log(video);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUploadVideo = async () => {
        setUploading(true);
        let apiUrl = getServerEndpoint("/api/post/createPost");
        try {
            if (!video) {
                showMessage({
                    message: "Versess",
                    description: "No video selected",
                    type: "warning",
                    duration: 1000,
                });
                return;
            }
            const form = new FormData();
            (form as any).append("files", {
                uri: video.uri,
                name: video.mimeType?.replace("/", "."),
                type: video.mimeType,
            });

            const response = await fetch(apiUrl, {
                method: "POST",
                body: form,
            });
            setUploading(false);

            const res = await response.json();
            if (!res.success) {
                showMessage({
                    message: "Versess",
                    description: res.message,
                    type: "warning",
                    duration: 1000,
                });
                router.push("/(tabs)/newPost")
                return;
            }
            showMessage({
                message: "Versess",
                description: res.message,
                type: "success",
                duration: 1000,
            });
        } catch (error) {
            setUploading(false);
            console.log(error);
        }
    };

    return (
        <View>
            {
                // !video && <VideoPlaceholder /> 
                !video && <VideoPlaceHolderIcon />
            }
            <VideoPlayer
                onchangeVideo={onVideoSelect}
                onUploadClick={onVideoSelect}
                videoUri={video ? video.uri : ""}
            />



            {video ? (
                <View style={styles.videoButtonWrapper}>
                    <ButtonSmall
                        text="Upload"
                        onPress={handleUploadVideo}
                        loadingComponent={uploading ? <ActivityIndicator size="small" color="#ffffff" /> : null}
                    />
                </View>
            ) : null}
        </View>
    );
}



const styles = StyleSheet.create({
    videoButtonWrapper: {
        marginTop: 20
    }
});
