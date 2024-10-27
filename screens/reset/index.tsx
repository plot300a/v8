import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import MainContainer from "@/components/MainContainer";
import { CustomNavigationHeader } from "@/commons/Header";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { screenWidth } from "@/constants/Window";
import { fontSize } from "@/constants/FontSizes";
import ButtonLarge from "@/commons/ButtonLarge";
import { ServerRequests } from "@/commons/server/routes";
import { showMessage } from "react-native-flash-message";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAuth } from "@/store/slice/auth";

export default function ResetPassword() {
    const dispatch = useAppDispatch();
    // const [password, setPassword] = useState<any>();
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const { password, email } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState<boolean>(false);

    const toggleSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleReset = async () => {
        const response = await ServerRequests.User({
            route: "/resetPassword",
            body: {
                email: email.trim(),
                pass_new: password,
            },
            axiosConfig: {
                headers: {},
            },
        });

        if (response.successful) {
            showMessage({
                message: "Versess",
                description: "Password reset sent successfully 🎉",
                type: "success",
                duration: 3000,
            });
        } else {
            showMessage({
                message: "Versess",
                description: "Something went wrong. Try again.",
                type: "danger",
                duration: 3000,
            });
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <CustomNavigationHeader title="Reset password" />
            <MainContainer>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            // placeholder= ""
                            // placeholderTextColor={Colors.grey}
                            value={password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={secureTextEntry}
                            onChangeText={(e) => dispatch(updateAuth({ password: e }))}
                            style={styles.password}
                            keyboardAppearance="light"
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Re-enter password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            // placeholder= ""
                            // placeholderTextColor={Colors.grey}
                            value={password}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={secureTextEntry}
                            onChangeText={(e) => dispatch(updateAuth({ email: e }))}
                            style={styles.password}
                            keyboardAppearance="light"
                        />
                        <TouchableOpacity onPress={toggleSecureTextEntry}>
                            {secureTextEntry ? (
                                <Ionicons name="eye-outline" size={24} color={Colors.grey} />
                            ) : (
                                <Ionicons
                                    name="eye-off-outline"
                                    size={24}
                                    color={Colors.grey}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: 'space-between',
                }}>
                    <ButtonLarge text="Reset Password" onPress={handleReset} />
                </View>
            </MainContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    inputContainer: {
        marginTop: 40,
        width: "100%",
    },
    label: {
        color: Colors.dark,
        fontSize: fontSize.normal,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: Colors.gray,
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
        backgroundColor: Colors.gray,
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        height: 50,
    },
    eye: {
        width: "10%",
    },
    button: {
        backgroundColor: Colors.secondary,
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.light,
        fontSize: 20,
        fontWeight: "bold",
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        width: "100%",
    },
});
