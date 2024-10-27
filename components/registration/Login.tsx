import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { fontSize } from "@/constants/FontSizes";
import ButtonLarge from "@/commons/ButtonLarge";
import ImageLargeButton from "@/commons/ImageLargeButton";
import { router } from "expo-router";
import * as Animatable from "react-native-animatable";
import { screenWidth } from "@/constants/Window";
import { Text, setThemeMode, useThemeColor, useThemeMode } from "@/theme";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAuth } from "@/store/slice/auth";
import { ServerRequests } from "@/commons/server/routes";
import { showMessage } from "react-native-flash-message";



export function Login({ signupPressed }: { signupPressed: () => void }) {
    const dispatch = useAppDispatch();
    const { gray0, gray1, gray2, icon, dark } = useThemeColor();
    const mode = useThemeMode();

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


    const { password, email } = useAppSelector((state) => state.auth);
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const [cureentScreen, setScreen] = useState<"login" | "signup">("login");
    const [loading, setLoading] = useState<boolean>(false);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleLogin = async () => {
        setLoading(true);
        // Sends requests to the server
        const response = await ServerRequests.User({
            route: "/login",
            body: {
                email: email.trim().toLocaleLowerCase(),
                password: password,
            },
            axiosConfig: {
                headers: {},
            },
        });

        if (response.successful) {
            showMessage({
                message: "Versess",
                description: "You've successfully logged in 🎉",
                type: "success",
                duration: 3000,
            })
            // setLoading(false)
            // router.push("/")
        } else {
            showMessage({
                message: "Versess",
                description: "Something went wrong. Try again.",
                type: "danger",
                duration: 3000,
            });
            setLoading(false);
        }
        // await signInWithEmailAndPassword(
        //     auth,
        //     email.trim().toLocaleLowerCase(),
        //     password
        // )
        //     .then((userCredential) => {
        //         const user = userCredential.user;
        //         getUserData(user);
        //         setLoading(false);
        //         showMessage({
        //             message: "Versess",
        //             description: "login succesful 🎉",
        //             type: "success",
        //             duration: 300,
        //         });
        //     })
        //     .catch((err: any) => {
        //         showMessage({
        //             message: "Versess",
        //             description: "Oops error logging in",
        //             type: "danger",
        //             duration: 3000,
        //         });
        //         setLoading(false);
        //     });
    };


    const handleForgotPassword = () => {
        router.push("/forgot/");
    };

    const handleGoogleSignin = () => {
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
                {/* header text */}
                <Animatable.View
                    duration={1000}
                    animation={"fadeIn"}
                    style={styles.headerTextContainer}
                >
                    <Text style={styles.headerText}>
                        Manage your accounts, check notifications, comment on Versess and
                        more.
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

                    <Animatable.View duration={400} animation={"fadeInUp"}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <View style={style.passwordContainer}>
                                <TextInput
                                    // placeholder= ""
                                    // placeholderTextColor={Colors.gray1}
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
                                text={loading ? undefined : "Login"}
                                onPress={handleLogin}
                                loadingComponent={loading ? <ActivityIndicator size={"small"} /> : undefined}
                            />
                        </View>
                        {/* forgot password */}
                        <TouchableOpacity
                            style={styles.headerTextContainer}
                            onPress={handleForgotPassword}
                        >
                            {/* <Link href="/forgot/"> */}
                            <Text style={styles.link}>Forgot Password? </Text>
                            {/* </Link> */}
                        </TouchableOpacity>
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
                                text="Sign in with Google"
                                onPress={handleGoogleSignin}
                            />
                        </View>
                        {/* privacy policy */}
                        <View style={styles.bottomTextContainer}>
                            <Text style={styles.bottomText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={signupPressed}>
                                <Text style={styles.link}>Sign up</Text>
                            </TouchableOpacity>
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
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        width: "100%",
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
        fontSize: fontSize.normal,
        fontWeight: "bold",
    },
    bottomTextContainer: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomText: {
        fontSize: fontSize.normal,
        fontWeight: "500",
    },
});
