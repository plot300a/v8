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

export default function RegistrationScreen() {
    const mode = useThemeMode();
    const Colors = useThemeColor();
    const { background } = Colors;
    // states to be replaced with redux
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<any>();
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const [cureentScreen, setScreen] = useState<"login" | "signup">("login");

    const modalAccessor: {
        showModal?: () => void;
        hideModal?: () => void;
    } = {
        showModal: undefined,
        hideModal: undefined,
    };

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleLogin = () => {
        showMessage({
            message: "Hello World",
            description: "This is our second message",
            type: "danger",
            icon: "info",
            duration: 3000,
        });
    };

    const handleForgotPassword = () => {
        router.push("/forgot/");
    };

    const handleGoogleSignin = () => {
        console.log("google signin");
    };

    const toggleScreen = () => {
        // router.navigate("/signup")
        setScreen(cureentScreen === "login" ? "signup" : "login");
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

    const isSignupScreen = cureentScreen === "signup";

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: background }}>
            <MainContainer>
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
                                isSignupScreen ? activeButtonStyle : nonActiveButtonStyle,
                            ]}
                            onPress={isSignupScreen ? undefined : toggleScreen}
                        >
                            <Text
                                style={{
                                    color: !isSignupScreen ? Colors.gray1 : Colors.secondary,
                                }}
                            >
                                Sign up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.navButton,
                                !isSignupScreen ? activeButtonStyle : nonActiveButtonStyle,
                            ]}
                            onPress={isSignupScreen ? toggleScreen : undefined}
                        >
                            <Text
                                style={{
                                    color: isSignupScreen ? Colors.gray1 : Colors.secondary,
                                }}
                            >
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {cureentScreen === "login" && <Login signupPressed={toggleScreen} />}
                    {cureentScreen === "signup" && <Signup modalAccess={modalAccessor} />}
                </View>

            </MainContainer>
            <BottomSheetModalComponent
                access={modalAccessor}
                message="check email for OTP"
                title="Verify OTP"
            />
        </GestureHandlerRootView>
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
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 6,
        width: "60%",
        alignSelf: "center",
    },
    navButton: {
        borderWidth: 1,
        padding: 15,
        paddingVertical: 10,
        borderRadius: 6,
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
});
