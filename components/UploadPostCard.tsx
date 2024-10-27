import { Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useThemeColor, useThemeMode } from "@/theme";
import audioData from "@/commons/data/postData/audioData";

export default function UploadPostCard() {
    const mode = useThemeMode();
    const { gray0, gray1, gray2, background, light, dark } = useThemeColor();
    const style = useMemo(() => {
        return {};
    }, [mode]);
    return (
        <View>
            <View>
                {audioData.map((item, index) => (
                    <View key={index}>
                        <View>
                            <View>
                                <Text>{item.icon}</Text>
                            </View>
                            <View>
                                <Image
                                    source={item.song}
                                    style={{ width: 100, height: 100 }}
                                    resizeMode="contain"
                                />
                                <Text>{item.size}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>{item.isChecked}</Text>
                        </View>
                    </View>
                ))
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
