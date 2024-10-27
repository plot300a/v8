import React, { useState, useRef, useMemo } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { fontSize } from "@/constants/FontSizes";
import { FontAwesome6 } from "@expo/vector-icons";
import ButtonLarge from "@/commons/ButtonLarge";
import { Colors } from "@/constants/Colors";
import { getServerEndpoint } from "@/commons/server/routes";
import { showMessage } from "react-native-flash-message";
import { useThemeColor, useThemeMode } from "@/theme";

export default function TextPost({ textPressed }: { textPressed: () => void }) {
    const [selectedfont, setSelectedFont] = useState("Plex");
    const [showFonts, setShowFonts] = useState(false);
    const [color, setColor] = useState("white");
    const textInputRef = useRef<any>(null);
    const [text, setText] = useState<string>()
    const [uploading, setUploading] = useState<boolean>(false);


    const { dark } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            pickerFont: {
                color: mode === "light" ? dark : dark,
            },
            color: {
                backgroundColor: mode === "light" ? "white" : dark,
            },
        };
    }, [mode]);


    const fontStyles = ["Plex", "Roboto", "Inter", "Lato"];

    const toggleFonts = () => {
        setShowFonts(!showFonts);
    };

    const handleChooseFont = (font: string) => {
        setSelectedFont(font);
        setShowFonts(false);
    };

    const handleChangeColor = (color: string) => {
        setColor(color);
    };



    const handlePost = () => {
        setUploading(true);
        let apiUrl = getServerEndpoint("/api/post/createPost");
        // let apiUrl = "https://94x66b80-4040.euw.devtunnels.ms/api/post/createPost"

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                style: selectedfont,
                color: color,
                text: text,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setUploading(false);
                    showMessage({
                        message: "Versess",
                        description: "Your post has been created successfully",
                        type: "success",
                        duration: 1000,
                    });
                    textPressed();
                } else {
                    console.log(data.message);
                    showMessage({
                        message: "Versess",
                        description: data.message,
                        type: "danger",
                        duration: 1000,
                    });

                    // showMessage({
                    //     message: "Post Creation Failed",
                    //     type: "danger",
                    // });
                }
            })
            .catch((error) => {
                setUploading(false);
                console.error("Error:", error);
            });
    };

    // const handlePost = async () => {
    //     setUploading(true);
    //     let apiUrl = getServerEndpoint("/api/post/createPost");
    //     try {
    //         const response = await fetch(apiUrl, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 style: selectedfont,
    //                 color: color,
    //                 text: text,
    //             }),
    //         });

    //         setUploading(false);

    //         const data = await response.json();
    //         if (data.success) {
    //             showMessage({
    //                 message: "Versess",
    //                 description: "Your post has been created successfully",
    //                 type: "success",
    //                 duration: 1000,
    //             });
    //             textPressed();
    //         } else {
    //             console.log(data.message);
    //             showMessage({
    //                 message: "Versess",
    //                 description: data.message,
    //                 type: "danger",
    //                 duration: 1000,
    //             });
    //         }
    //     } catch (error) {
    //         setUploading(false);
    //         console.log(error);

    //     }
    // };

    return (
        <View style={styles.container}>
            <View style={styles.Wrapper}>
                <View style={styles.picker}>
                    <View style={styles.pickerText}>
                        <Text style={[styles.pickerFont, style.pickerFont]}>Aa</Text>
                    </View>
                    <View style={styles.fontText}>
                        <Text style={style.pickerFont}>Fonts</Text>
                        <TouchableOpacity onPress={toggleFonts}>
                            {showFonts ? (
                                <Text>
                                    <FontAwesome6 name="angle-up" size={20} color={dark} />
                                </Text>
                            ) : (
                                <Text>
                                    <FontAwesome6 name="angle-down" size={20} color={dark} />
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View style={{ marginLeft: 15 }}>
                            {showFonts &&
                                fontStyles.map((font: any, index: number) => (
                                    <View style={styles.fontDropdown} key={index}>
                                        <TouchableOpacity onPress={() => handleChooseFont(font)}>
                                            <Text style={[styles.fontDropdownText, style.pickerFont]}>{font}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                            {
                                showFonts ? (
                                    <View style={styles.color}>
                                        <TouchableOpacity onPress={() => handleChangeColor("black")}>
                                            <View style={styles.whiteBox}></View>
                                            <View style={styles.blackBox}></View>
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        ref={textInputRef}
                        placeholder="Tap to Write"
                        placeholderTextColor={dark}
                        style={{
                            fontFamily: selectedfont,
                            fontSize: fontSize.xLarge,
                            fontWeight: "400",
                            height: 50,
                            width: "100%",
                            paddingLeft: 30,
                            color: dark ? "white" : "black",
                        }}
                        onChangeText={(e) => setText(e)}
                        value={text}
                    />
                </View>
            </View>

            <View>
                <ButtonLarge
                    text="Complete"
                    onPress={handlePost}
                    loadingComponent={uploading ? <ActivityIndicator size="small" color="#ffffff" /> : null}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    Wrapper: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    picker: {
        width: "15%",
    },
    pickerText: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.link,
    },
    pickerFont: {
        fontSize: fontSize.medium,
        fontWeight: "bold",
    },
    fontText: {
        marginTop: 2,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Lato",
    },
    fontDropdown: {
        marginHorizontal: 15,
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    fontDropdownText: {
        fontSize: fontSize.normal,
        fontWeight: "bold",
    },
    inputWrapper: {
        width: "83%",
    },
    color: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    whiteBox: {
        width: 25,
        height: 25,
        backgroundColor: "white",
        marginRight: -15,
    },
    blackBox: {
        width: 20,
        height: 20,
        backgroundColor: "black",
        marginTop: -35,
        marginLeft: 10,
    },
});
