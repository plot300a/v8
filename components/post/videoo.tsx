import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMediaContent, useMediaPermissions } from '@/commons/FilePicker';
import { Asset } from 'expo-media-library';
import { CustomImageComponent } from '@/commons/Image';
import { useThemeColor } from '@/theme';
import { ToggleableButton } from '@/commons/ButtonToggler';
import { getServerEndpoint } from '@/commons/server/routes';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { isAndroid } from '@/constants/Window';
import { showMessage } from 'react-native-flash-message';
import { Video, ResizeMode } from 'expo-av';

export default function VideoPost({ videoPressed }: { videoPressed: () => void }) {
    const [videos, setVideos] = useState<(Asset & { albumTitle: string })[]>([]);
    const [displayedItem, setDisplayedItem] = useState<Asset | null>(null);
    const [selections, setSelections] = useState<{ [k: string]: Asset | null }>({});
    const [selectIds, setSelectionIds] = useState<string[]>([]);
    const mediaPermissions = useMediaPermissions();
    const { gray0 } = useThemeColor();
    const [uploading, setUploading] = useState(false);

    const maximum = 20;
    const selectionCount = selectIds.length;

    useEffect(() => {
        if (videos.length >= maximum - 2) {
            return;
        }
        getContents(mediaPermissions).then((res) => {
            if (res.content) {
                setVideos(res.content);
                setDisplayedItem(res.content[0]);
            } else {
                console.log(res);

            }
        }).catch((reason) => {
            console.log(reason);

        })
    }, [mediaPermissions]);

    const getContents = async (mediaPermissions: any) => {
        return await getMediaContent({ type: 'video', maximum: maximum, permissions: mediaPermissions })
    }

    const onSelect = (asset: Asset) => {
        const assetId = asset.id;
        if (selections[assetId]) {
            let selects = selectIds;
            const deselectedIndex = selectIds.indexOf(assetId);
            if (deselectedIndex >= 0) {
                selects = [...selectIds.slice(0, deselectedIndex), ...selectIds.slice(deselectedIndex + 1)];
                setSelectionIds(selects);
            }

            if (selects.length <= 0) {
                setSelections({});
                setDisplayedItem(null);
            } else {
                setSelections({
                    ...selections,
                    [assetId]: null
                });
                setDisplayedItem(selections[selects[selects.length - 1]]);
            }
        } else {
            if (selectIds.length >= 1) {
                return;
            };
            setSelectionIds([...selectIds, assetId]);
            setSelections({
                ...selections,
                [assetId]: asset
            });
            setDisplayedItem(asset);
        }

    }

    return (
        <View>
            <View style={[styles.imageDisplayContainer, { backgroundColor: gray0 }]}>
                {/* <CustomImageComponent imageAlt='Last selected image' imageContentFit='cover' uri={displayedItem ? displayedItem.uri : videos.length > 0 ? videos[0].uri : 'no-secteable-image'} /> */}
                <Video
                    source={{ uri: displayedItem ? displayedItem.uri : videos.length > 0 ? videos[0].uri : 'no-secteable-image' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay
                    isLooping
                    style={{ width: '100%', height: 200 }}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >

                <View testID='items-container' style={[styles.imageDisplayInnerContainer, { backgroundColor: gray0 }]}>
                    {videos.map((video, index) => {
                        return (
                            <SelectableFileItem
                                selected={!!selections[video.id]}
                                key={`${video.id}-${index}`}
                                asset={video}
                                onPress={onSelect}
                            />
                        )
                    })}
                </View>

                <View
                    style={{ marginBottom: 20, }}
                >

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
                                    uploadAssetAsync(selectIds.map((id, index) => selections[id] as Asset).filter((asset) => !!asset))
                                        .then(async (response) => {
                                            setUploading(false);

                                            if (!response) {
                                                console.log('Error occured while uploading assets');
                                                showMessage({
                                                    message: "Versess",
                                                    description: "Error occured while uploading assets",
                                                    type: "danger"
                                                })
                                                return;
                                            }
                                            console.log(response);
                                            console.log('Files Uploaded...');


                                        })
                                        .catch((reason) => {
                                            setUploading(false);
                                            console.log(reason);
                                        });
                                }, 2000);
                                console.log('Upload Request Sent...');
                                showMessage({
                                    message: "Versess",
                                    description: "Upload Request Sent",
                                    type: "success"
                                })

                            }
                        }}
                    />

                </View>

            </ScrollView>

        </View>
    )
}


export const SelectableFileItem = ({ asset, onPress, selected }: { asset: Asset & { albumTitle: string }; onPress?: (asset: Asset & { albumTitle: string }) => void; selected?: boolean }) => {
    const { primary, white } = useThemeColor();
    // console.log(asset.uri);

    return (
        <Pressable
            onPress={() => {
                onPress && onPress(asset);
            }}
            style={[styles.selectableItem, { borderColor: selected ? primary : 'rgba(0,0,0,0)' }]}>
            <CustomImageComponent imageAlt={`Image item from your device. This image is named ${asset.filename} form the ${asset.albumTitle}`} uri={asset.uri} />
        </Pressable>
    )
}

async function getAssetInfo(asset: Asset) {
    return await MediaLibrary.getAssetInfoAsync(asset)
}

/** 
 * Returns a promise that resolves to `false` if an error occured on the client side 
 * or resolves to a **request object** from the server 
 * 
 */
export async function uploadAssetAsync(assets: Asset[]) {
    let apiUrl = getServerEndpoint('/api/post/createPost');
    let assetsLength = assets.length;
    let count = 0;
    // let blob: any;
    let info: MediaLibrary.AssetInfo;
    let wasErrored = false;
    if (assetsLength) {
        const form = new FormData();

        async function addItem(uri: string, filename: string) {
            const fileType = filename.split('.').pop()?.toLowerCase();
            (form as any).append(
                'files',
                {
                    uri: uri,
                    name: filename,
                    type: `video/${fileType}`
                }
            )

            if (++count < assetsLength) {
                info = await getAssetInfo(assets[count]);
                if (!info.localUri) {
                    wasErrored = true;
                    return;
                }
                await addItem(info.localUri as string, info.filename);
            }
        };
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
            return false
        }
        const fetchController = new AbortController();
        const timeout = setTimeout(() => {
            // End request if no response is retreieved after some seconds
            fetchController.abort('Request Timeout Error');
        }, 8000);
        let options = {
            method: 'POST',
            body: form,
            signal: fetchController.signal
        };
        const res = await fetch(apiUrl, options);
        clearTimeout(timeout);
        return res;
    }
    return false;

}


async function getResourceBlob(uri: string) {
    const response = {
        success: false,
        data: undefined
    } as any;
    response.data = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            response.success = !false;
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            response.success = false;
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    return response;
}

const styles = StyleSheet.create({
    imageDisplayContainer: {
        marginVertical: 10,
        height: 200,
        borderRadius: 5,
        overflow: 'hidden'
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
        marginBottom: '50%'
    },
    buttonStyle: { fontWeight: 'bold' },
    selectableItem: {
        width: "24%",
        height: 70,
        borderRadius: 3,
        marginBottom: 2,
        borderWidth: 2,
        overflow: 'hidden'

    }
})