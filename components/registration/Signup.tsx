import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from "@expo/vector-icons";
import { fontSize } from "@/constants/FontSizes";
import ButtonLarge from "@/commons/ButtonLarge";
import ImageLargeButton from "@/commons/ImageLargeButton";
import { screenWidth } from "@/constants/Window";
import * as Animatable from "react-native-animatable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAuth } from "@/store/slice/auth";
import { Text, useThemeColor, useThemeMode } from "@/theme";
import { Colors } from "@/constants/Colors";
import { showMessage } from "react-native-flash-message";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ServerRequests } from "@/commons/server/routes";

export function Signup({
    modalAccess,
}: {
    modalAccess: { showModal?: () => void };
}) {
    const { gray0, gray1, gray2, icon, background, dark } = useThemeColor();
    const mode = useThemeMode();
    const dispatch = useAppDispatch();

    const style = useMemo(() => {
        return {
            input: [
                styles.input,
                { backgroundColor: gray0, color: dark, fontSize: 15 },
            ],
            password: [styles.password, { color: dark, fontSize: 15 }],
            passwordContainer: [styles.passwordContainer, { backgroundColor: gray0 }],
            or: [styles.or, { color: gray1 }],
        };
    }, [mode]);

    const { password, phoneNumber, email } = useAppSelector(
        (state) => state.auth
    );
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleSubmit = async () => {
        console.log("sign");

        if (!email) {
            console.log("email");

            return showMessage({
                message: "Versess",
                description: "Email is required",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
        if (!password) {
            return showMessage({
                message: "Versess",
                description: "Password is required",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
        if (!phoneNumber) {
            return showMessage({
                message: "Versess",
                description: "Phone number is required",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }

        setLoading(true);
        // Sends requests to the server
        const response = await ServerRequests.User({
            route: "/createUser",
            body: {
                email: email.trim(),
                phone: phoneNumber,
                password: password,
            },
            axiosConfig: {
                // Incase there must be some added headers
                headers: {},
            },
        });

        if (response.successful) {
            console.log("modal");

            // Do something...
            modalAccess.showModal && modalAccess.showModal();
            showMessage({
                message: "Versess",
                description: "You've successfully created an account 🎉",
                type: "success",
                duration: 3000,
            });
        } else {
            showMessage({
                message: "Versess",
                description: "Something went wrong. Try again.", // Or some useful feedback
                type: "danger",
                duration: 3000,
            });
            setLoading(false);
        }
        // await createUserWithEmailAndPassword(auth, email.trim(), password)
        //     .then((userCredential) => {
        //         const user = userCredential.user;
        //         setLoading(false);
        //         setDoc(doc(db, "users", user.uid), {
        //             Email: email.trim(),
        //             Uid: user.uid,
        //             SignUpDate: new Date().toUTCString(),
        //             PhoneNo: phoneNumber,
        //         });
        //     })
        //     .then(() =>
        // showMessage({
        //     message: "Versess",
        //     description: "You've successfully created an account 🎉",
        //     type: "success",
        //     duration: 300,
        // })
        //     )
        //     .catch((err: any) => {
        //         showMessage({
        //             message: "Versess",
        //             description: err.message,
        //             type: "danger",
        //             duration: 300,
        //         });
        //         setLoading(false);
        //     });
    };

    const handleGoogleSignup = () => {
        showMessage({
            message: "Versess",
            description: "Oops, error connecting to Google. Try again☹️",
            type: "warning",
            duration: 3000,
        })
    };

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* input  fields */}
                <Animatable.View
                    duration={1000}
                    animation={"fadeIn"}
                    style={styles.headerTextContainer}
                >
                    <Text style={styles.headerText}>
                        Create a profile, follow other accounts, make your Versess and more.
                    </Text>
                </Animatable.View>
                <View style={styles.inputContainer}>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={style.input}
                            placeholder="example@email.com"
                            value={email}
                            onChangeText={(e) => dispatch(updateAuth({ email: e }))}
                            placeholderTextColor={gray2}
                            keyboardAppearance="light"
                        />
                    </View>
                    <Animatable.View
                        delay={90}
                        duration={200}
                        animation={"fadeInLeft"}
                        style={styles.inputGroup}
                    >
                        <Text style={styles.label}>Phone Number</Text>
                        <PhoneInput
                            // placeholder="Eg. 549 216 821"
                            defaultCode="GH"
                            onChangeFormattedText={(e) =>
                                dispatch(updateAuth({ phoneNumber: e }))
                            }
                            withDarkTheme={mode === "dark"}
                            // withShadow={true}
                            containerStyle={{
                                borderRadius: 8,
                                width: "100%",
                                backgroundColor: background,
                                marginTop: 10,
                                height: 50,
                                borderTopLeftRadius: 8,
                                borderBottomLeftRadius: 8,
                            }}
                            textContainerStyle={{
                                borderRadius: 8,
                                backgroundColor: gray0,
                                borderLeftColor: background,
                                borderLeftWidth: 3,
                                height: 50,
                            }}
                            textInputStyle={{ fontSize: 15, color: dark, height: 50 }}
                            countryPickerButtonStyle={{
                                backgroundColor: gray0,
                                height: 50,
                                borderRightColor: background,
                                borderRightWidth: 3,
                                borderRadius: 8,
                                borderTopRightRadius: 8,
                                borderBottomRightRadius: 8,
                            }}
                            placeholder="555 000 000"
                            codeTextStyle={{ color: dark }}
                            flagButtonStyle={{ backgroundColor: gray1 }}
                        />
                    </Animatable.View>
                    <Animatable.View duration={400} animation={"fadeInDown"}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={style.passwordContainer}>
                                <TextInput
                                    // placeholder= ""
                                    // placeholderTextColor={Colors.grey}
                                    value={password}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={(e) => dispatch(updateAuth({ password: e }))}
                                    style={style.password}
                                    keyboardAppearance="light"
                                />
                                <TouchableOpacity onPress={toggleSecureTextEntry}>
                                    {secureTextEntry ? (
                                        <Ionicons name="eye-outline" size={24} color={icon} />
                                    ) : (
                                        <Ionicons name="eye-off-outline" size={24} color={icon} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* signup button */}
                        <View style={styles.signupContainer}>
                            <ButtonLarge
                                text={loading ? undefined : "Sign up"}
                                onPress={handleSubmit}
                                loadingComponent={
                                    loading ? <ActivityIndicator size={"small"} /> : undefined
                                }
                            />
                        </View>
                        {/* other signup alternative */}

                        <View style={styles.signupAltContainer}>
                            <Image
                                source={require("../../assets/images/Line.png")}
                                style={styles.line}
                            />
                            <Text style={style.or}>or</Text>
                            <Image
                                source={require("../../assets/images/Line.png")}
                                style={styles.line}
                            />
                        </View>
                        {/* signup with google */}
                        <View style={styles.signupContainer}>
                            <ImageLargeButton
                                text="Sign up with Google"
                                onPress={handleGoogleSignup}
                            />
                        </View>
                        {/* privacy policy */}
                        <View style={styles.bottomTextContainer}>
                            <Text style={styles.bottomText}>
                                By countinuing, you agree to VeRsEsS's{" "}
                                <Text style={styles.link}>Terms of Use</Text>
                            </Text>
                            <Text style={styles.bottomText}>
                                and confirm that you have read VeRsEsS's{" "}
                                <Text style={styles.link}>Privacy Policy</Text>{" "}
                            </Text>
                        </View>
                    </Animatable.View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: fontSize.xSmall,
    },
    inputContainer: {
        marginTop: 40,
        width: "100%",
    },
    inputGroup: {
        marginTop: 20,
    },
    label: {
        fontSize: fontSize.normal,
        fontWeight: "bold",
    },
    input: {
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        height: 50,
    },
    password: {
        width: screenWidth - 100,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        height: 50,
    },
    eye: {
        width: "10%",
    },
    signupContainer: {
        marginTop: 10,
    },
    signupAltContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 20,
    },
    or: {
        color: Colors.grey,
        fontSize: fontSize.normal,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
    line: {
        width: "50%",
        height: 2,
    },
    headerTextContainer: {
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontSize: fontSize.normal,
        fontWeight: "500",
        textAlign: "center",
        marginHorizontal: "8%",
    },
    link: {
        color: Colors.link,
        fontSize: fontSize.small,
        fontWeight: "bold",
    },
    bottomTextContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomText: {
        fontSize: fontSize.small,
        fontWeight: "500",
    },
});
