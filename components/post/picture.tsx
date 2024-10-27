import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getMediaContent, useMediaPermissions } from "@/commons/FilePicker";
import { Asset } from "expo-media-library";
import { CustomImageComponent } from "@/commons/Image";
import { useThemeColor } from "@/theme";
import { ToggleableButton } from "@/commons/ButtonToggler";
import { getServerEndpoint } from "@/commons/server/routes";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { isAndroid } from "@/constants/Window";
import { showMessage } from "react-native-flash-message";

export default function PicturePost({
    picturePressed,
}: {
    picturePressed: () => void;
}) {
    const [photos, setPhotos] = useState<(Asset & { albumTitle: string })[]>([]);
    const [displayedItem, setDisplayedItem] = useState<Asset | null>(null);
    const [selections, setSelections] = useState<{ [k: string]: Asset | null }>(
        {}
    );
    const [selectIds, setSelectionIds] = useState<string[]>([]);
    const mediaPermissions = useMediaPermissions();
    const { gray0 } = useThemeColor();
    const [uploading, setUploading] = useState(false);

    const maximum = 20;
    const selectionCount = selectIds.length;

    useEffect(() => {
        if (photos.length >= maximum - 2) {
            return;
        }
        getContents(mediaPermissions)
            .then((res) => {
                if (res.content) {
                    setPhotos(res.content);
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
            type: "image",
            maximum: maximum,
            permissions: mediaPermissions,
        });
    };

    const onSelect = (asset: Asset) => {
        const assetId = asset.id; // get selected item id
        if (selections[assetId]) {
            // Item exists in selected items object
            // Item was already selected so remove from selected items
            let selects = selectIds; // get the array of all selected items' ids
            // ensure item actually exists in the selected ids' array
            // If exists, remove
            const deselectedIndex = selectIds.indexOf(assetId);
            if (deselectedIndex >= 0) {
                selects = [
                    ...selectIds.slice(0, deselectedIndex),
                    ...selectIds.slice(deselectedIndex + 1),
                ];
                setSelectionIds(selects);
            }

            if (selects.length <= 0) {
                // selected item ids' array is empty
                setSelections({}); // reset selected items object
                setDisplayedItem(null); // set to display the first item in the rended items
            } else {
                // set the deselected item to null in the selected items' object
                setSelections({
                    ...selections,
                    [assetId]: null,
                });
                // Display the last selected item
                setDisplayedItem(selections[selects[selects.length - 1]]);
            }
        } else {
            if (selectIds.length >= 6) {
                // there s selected items so far
                // If there are maximum 6 selected items, retun to ignore this selection
                return;
            }
            // append the id of the selected item to the ids' array
            setSelectionIds([...selectIds, assetId]);
            // add the selected item to the selected items' object
            setSelections({
                ...selections,
                [assetId]: asset,
            });
            // Display the last selected item
            setDisplayedItem(asset);
        }
    };

    return (
        <View>
            <View style={[styles.imageDisplayContainer, { backgroundColor: gray0 }]}>
                <CustomImageComponent
                    imageAlt="Last selected image"
                    imageContentFit="cover"
                    uri={
                        displayedItem
                            ? displayedItem.uri
                            : photos.length > 0
                                ? photos[0].uri
                                : "no-secteable-image"
                    }
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    testID="items-container"
                    style={[
                        styles.imageDisplayInnerContainer,
                        { backgroundColor: gray0 },
                    ]}
                >
                    {photos.map((photo, index) => {
                        return (
                            <SelectableFileItem
                                selected={!!selections[photo.id]}
                                key={`${photo.id}-${index}`}
                                asset={photo}
                                onPress={onSelect}
                            />
                        );
                    })}
                </View>

                <View style={{ marginBottom: 20 }}>
                    <ToggleableButton
                        loading={uploading}
                        active={selectionCount > 0}
                        title={`Add(${selectionCount})`}
                        textStyle={styles.buttonStyle}
                        style={styles.button}
                        onPress={() => {
                            if (selectIds.length > 0 && !uploading) {
                                setUploading(true);
                                setTimeout(() => {
                                    uploadAssetAsync(
                                        selectIds
                                            .map((id, index) => selections[id] as Asset)
                                            .filter((asset) => !!asset)
                                    )
                                        .then(async (response) => {
                                            setUploading(false);

                                            if (!response) {
                                                console.log("Error occured while uploading assets");

                                                // showMessage({
                                                //     message: "Versess",
                                                //     description: "Error occured while uploading assets",
                                                //     type: "danger",
                                                //     duration: 1000,
                                                // })
                                                return;
                                            }
                                            // const serverResponse = await response.json();
                                            // console.log(serverResponse);
                                            console.log(response);
                                            console.log("Files Uploaded...");
                                        })
                                        .catch((reason) => {
                                            setUploading(false);
                                            console.log(reason);
                                            // showMessage({
                                            //     message: "Versess",
                                            //     description: reason,
                                            //     type: "danger",
                                            //     duration: 1000,
                                            // })
                                        });
                                }, 2000);
                                console.log("Upload Request Sent...");
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export const SelectableFileItem = ({
    asset,
    onPress,
    selected,
}: {
    asset: Asset & { albumTitle: string };
    onPress?: (asset: Asset & { albumTitle: string }) => void;
    selected?: boolean;
}) => {
    const { primary, white } = useThemeColor();
    // console.log(asset.uri);

    return (
        <Pressable
            onPress={() => {
                onPress && onPress(asset);
            }}
            style={[
                styles.selectableItem,
                { borderColor: selected ? primary : "rgba(0,0,0,0)" },
            ]}
        >
            <CustomImageComponent
                imageAlt={`Image item from your device. This image is named ${asset.filename} form the ${asset.albumTitle}`}
                uri={asset.uri}
            />
        </Pressable>
    );
};

async function getAssetInfo(asset: Asset) {
    return await MediaLibrary.getAssetInfoAsync(asset);
}

/**
 * Returns a promise that resolves to `false` if an error occured on the client side
 * or resolves to a **request object** from the server
 *
 */
export async function uploadAssetAsync(assets: Asset[]) {
    let apiUrl = getServerEndpoint("/api/post/createPost");
    let assetsLength = assets.length;
    let count = 0;
    // let blob: any;
    let info: MediaLibrary.AssetInfo;
    let wasErrored = false;
    if (assetsLength) {
        const form = new FormData();

        async function addItem(uri: string, filename: string) {
            const fileType = filename.split(".").pop()?.toLowerCase();
            (form as any).append("files", {
                uri: uri,
                name: filename,
                type: `image/${fileType}`,
            });

            if (++count < assetsLength) {
                info = await getAssetInfo(assets[count]);
                if (!info.localUri) {
                    wasErrored = true;
                    return;
                }
                await addItem(info.localUri as string, info.filename);
            }
        }
        try {
            info = await getAssetInfo(assets[count]);
            if (!info.localUri) {
                wasErrored = true;
                return;
            }
            await addItem(info.localUri as string, info.filename);
        } catch (error) {
            wasErrored = true;
        }
        if (wasErrored) {
            return false;
        }
        const fetchController = new AbortController();
        const timeout = setTimeout(() => {
            // End request if no response is retreieved after some seconds
            fetchController.abort("Request Timeout Error");
        }, 8000);
        let options = {
            method: "POST",
            body: form,
            signal: fetchController.signal,
        };
        const res = await fetch(apiUrl, options);
        clearTimeout(timeout);
        return res;
    }
    return false;
}

const styles = StyleSheet.create({
    imageDisplayContainer: {
        marginVertical: 10,
        height: 200,
        borderRadius: 5,
        overflow: "hidden",
    },
    imageDisplayInnerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 10,
        paddingVertical: 0,
        borderRadius: 5,
    },
    button: {
        paddingVertical: 15,
        marginTop: 10,
        marginBottom: "50%",
    },
    buttonStyle: { fontWeight: "bold" },
    selectableItem: {
        width: "24%",
        height: 70,
        borderRadius: 3,
        marginBottom: 2,
        borderWidth: 2,
        overflow: "hidden",
    },
});
