import {
    Button,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import UploadPlaceholder from "../UploadPlaceholder";
import ButtonSmall from "@/commons/ButtonSmall";
import UploadModal from "../UploadModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useThemeColor, useThemeMode } from "@/theme";
import { Colors } from "@/constants/Colors";
import UploadPostCard from "../UploadPostCard";
import SongList from "../SongList";
import { getMediaContent, useMediaPermissions } from "@/commons/FilePicker";
import { Asset } from "expo-media-library";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import Checkbox from "expo-checkbox";
import { ToggleableButton } from "@/commons/ButtonToggler";
import axios from "axios";
import { getServerEndpoint } from "@/commons/server/routes";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";

export default function AudioPost({
    audioPressed,
}: {
    audioPressed: () => void;
}) {
    const Colors = useThemeColor();
    const { background } = Colors;
    const { gray0, dark, light } = useThemeColor();

    const [audios, setAudios] = useState<Asset[]>([]);
    const [displayedItem, setDisplayedItem] = useState<Asset | null>(null);
    const [selections, setSelections] = useState<{ [k: string]: Asset | null }>(
        {}
    );
    const [selectIds, setSelectionIds] = useState<string[]>([]);
    const mediaPermissions = useMediaPermissions();
    const [uploading, setUploading] = useState(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const selectionCount = selectIds.length;
    const maximum = 10;

    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            header: {
                color: mode === "light" ? dark : light,
            },
        };
    }, [mode]);


    useEffect(() => {
        getContents(mediaPermissions)
            .then((res) => {
                if (res.content) {
                    setAudios(res.content);
                    setDisplayedItem(res.content[0]);
                } else {
                    console.log(res);
                }
            })
            .catch((reason) => {
                console.log(reason);
            });
    }, [mediaPermissions]);

    const getContents = async (mediaPermissions: any) => {
        return await getMediaContent({
            type: "audio",
            maximum: maximum,
            permissions: mediaPermissions,
        });
    };

    const onSelect = (asset: Asset) => {
        const assetId = asset.id;
        if (selections[assetId]) {
            let selects = selectIds;
            const deselectedIndex = selectIds.indexOf(assetId);
            if (deselectedIndex >= 0) {
                selects = [
                    ...selectIds.slice(0, deselectedIndex),
                    ...selectIds.slice(deselectedIndex + 1),
                ];
                setSelectionIds(selects);
            }

            if (selects.length <= 0) {
                setSelections({});
                setDisplayedItem(null);
            } else {
                setSelections({
                    ...selections,
                    [assetId]: null,
                });
                setDisplayedItem(selections[selects[selects.length - 1]]);
            }
        } else {
            if (selectIds.length >= 5) {
                return;
            }
            setSelectionIds([...selectIds, assetId]);
            setSelections({
                ...selections,
                [assetId]: asset,
            });
            setDisplayedItem(asset);
        }
    };

    // const UploadAudio = async () => {
    //     let apiUrl = getServerEndpoint("/api/post/createPost");
    //     try {
    //         if (!audios) {
    //             showMessage({
    //                 message: "Versess",
    //                 description: "No Audios selected",
    //                 type: "warning",
    //             });
    //             return;
    //         }
    //         const response = await fetch(apiUrl, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 audios: selectIds,
    //             }),
    //         });

    //         const res = await response.json();
    //         if (!res.success) {
    //             showMessage({
    //                 message: "Versess",
    //                 description: res.message,
    //                 type: "warning",
    //             });
    //             router.push("/(tabs)/newPost");
    //             return;
    //         }
    //         showMessage({
    //             message: "Versess",
    //             description: res.message,
    //             type: "success",
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const UploadAudio = async () => {
        setUploading(true);
        let apiUrl = getServerEndpoint("/api/post/createPost");
        try {
            if (!audios) {
                showMessage({
                    message: "Versess",
                    description: "No audios selected",
                    type: "warning",
                    duration: 1000,
                });
                return;
            }

            const mimeTypes = {
                'mp3': 'audio/mpeg',
                'ogg': 'audio/ogg',
                'wav': 'audio/wav',
                'flac': 'audio/flac',
                'aac': 'audio/aac',
            };

            const form = new FormData();
            (form as any).append("files", {
                uri: audios[0].uri,
                name: audios[0].filename,
                type: mimeTypes[audios[0].filename.split('.').pop() as keyof typeof mimeTypes],

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
                router.push("/(tabs)/newPost");
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
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: background }}>
            <View style={styles.container}>
                <View>
                    <UploadPlaceholder />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 20 }}>
                        {audios.map((audio, index) => {
                            return (
                                <View key={audio.id}>
                                    <SongItemsList
                                        // asset={audios[index]}
                                        asset={audio}
                                        onPress={onSelect}
                                        selected={!!selections[audio.id]}
                                        key={`${audio.id}-${index}`}
                                    />
                                </View>
                            );
                        })}
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <ToggleableButton
                            loading={uploading}
                            active={selectionCount > 0}
                            onPress={UploadAudio}
                            title={`Add(${selectionCount})`}
                        />
                    </View>
                </ScrollView>
            </View>
        </GestureHandlerRootView>
    );
}

// const AudioList = ({ audio }: { audio: Asset }) => {
//     const [assets, setAssets] = useState<Asset[]>([]);

//     useEffect(() => {
//         async function getAudioAssets() {
//             const albumAssets = await MediaLibrary.getAssetsAsync({ mediaType: "audio" });
//             setAssets(albumAssets.assets);
//         }
//         getAudioAssets();
//     }, [audio]);
//     return (
//         <>
//             {assets && assets.map((asset) => (
//                 <Image source={{ uri: asset.uri }} width={50} height={50} />
//             ))}
//             <View>
//                 <Text>{audio.filename}</Text>
//             </View>
//         </>
//     )
// }

// export const SongItemsList = ({
//     audio,
//     asset,
//     onPress,
//     selected,
// }: {
//     audio: Asset;
//     asset: Asset;
//     onPress?: (asset: Asset) => void;
//     selected?: boolean;
// }) => {

export const SongItemsList = ({
    asset,
    onPress,
    selected = false,
}: {
    asset: Asset;
    onPress?: (asset: Asset) => void;
    selected?: boolean;
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(onPress ? selected : false);


    const { gray0, dark, gray1 } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            header: {
                color: mode === "light" ? dark : dark,
            },
        };
    }, [mode]);



    const audioSizes = [
        "5MB",
        "8MB",
        "8.5MB",
        "2MB",
        "10MB",
        "6MB",
        "7MB",
        "9MB",
        "3MB",
        "4MB",
    ];

    const [randomIndex, setRandomIndex] = useState(
        Math.floor(Math.random() * audioSizes.length)
    );

    useEffect(() => {
        setRandomIndex(Math.floor(Math.random() * audioSizes.length));
    }, []); // Empty dependency array to run only on mount




    // const audioAssets = {
    //     assets: [
    //         {
    //             uri: asset.uri,
    //             duration: asset.duration,
    //         },
    //     ],
    // };
    // const estimatedSizes = audioAssets.assets.map((asset) => {
    //     const uri = asset.uri;
    //     const durationMillis = asset.duration;
    //     const fileSize = FileSystem.getInfoAsync(uri, { size: true });
    //     const fileSizeInMB = Number(fileSize) / 1024 / 1024;
    //     return {
    //         uri,
    //         durationMillis,
    //         estimatedSize: fileSizeInMB.toFixed(2),
    //     };
    // });



    return (
        <View style={{ marginTop: 15 }}>
            <Pressable
                onPress={() => {
                    setIsChecked(true)
                    onPress && onPress(asset);
                }}
                onPressIn={() => setIsChecked(!isChecked)}
            >
                <View style={styles.cardContainer}>
                    <View style={styles.cardLeftItems}>
                        <Image
                            source={require("../../assets/images/upload.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.cardMiddleItems}>
                        <View style={{}}>
                            <Text
                                style={{
                                    color: "#ffffff",
                                    fontSize: 10,
                                    fontWeight: "bold",
                                }}
                            >
                                {asset.filename}
                            </Text>
                        </View>
                        <Text style={[styles.sizeText, { color: "#ffff" }]}>
                            {audioSizes[randomIndex]}
                        </Text>
                        <View style={styles.progress}>
                            {onPress ? (
                                <View
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        backgroundColor: "#D3D3D3",
                                        borderRadius: 5,
                                    }}
                                ></View>
                            ) : (
                                <View
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        backgroundColor: "#F92F40",
                                        borderRadius: 5,
                                    }}
                                ></View>
                            )}
                        </View>
                    </View>
                    {/* </View> */}
                    <View style={styles.cardRightItems}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            style={styles.checkbox}
                            color={onPress ? "#F75211" : "#fff"}
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: "space-between",
        // alignItems: "center",
        height: "100%",
    },
    image: {
        width: 25,
        height: 25,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#010026",
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "#F92F40",
        borderWidth: 1,
        width: "100%",
    },
    cardLeftItems: {
        flexDirection: "row",
        alignItems: "center",
        width: "10%",
    },
    cardMiddleItems: {
        flexWrap: "wrap",
        // width: 220,
        width: "80%",
        marginLeft: 10,
    },
    cardRightItems: {
        flexDirection: "row",
        alignItems: "center",
        width: "10%",
    },
    sizeText: {
        color: "gray",
        fontSize: 8,
    },
    progress: {
        width: 220,
        height: 1,
        backgroundColor: "#F92F40",
        borderRadius: 5,
        marginTop: 5,
    },
    checkbox: {
        margin: 8,
        borderRadius: 34,
        borderWidth: 1,
        height: 17,
        width: 17,
        color: "#F92F40",
        // color: "white"
    },
});
