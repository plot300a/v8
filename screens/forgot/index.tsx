import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, TextInput, View, Dimensions, Platform } from "react-native";
import React, { useState, useCallback, useMemo, useRef } from "react";
import MainContainer from "@/components/MainContainer";
import { Link, router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { fontSize } from "@/constants/FontSizes";
import ButtonLarge from "@/commons/ButtonLarge";
import { AntDesign } from '@expo/vector-icons';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { CustomNavigationHeader } from '@/commons/Header';
import { useThemeColor, Text, useThemeMode } from '@/theme';
import { ServerRequests } from "@/commons/server/routes";
import { showMessage } from "react-native-flash-message";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAuth } from "@/store/slice/auth";

const { height: Height } = Dimensions.get("window");
let top;
if (Platform.OS === "ios") {
    top = Height * 0.02;
} else {
    top = 15;
}


export default function ForgotPasswordScreen() {
    const dispatch = useAppDispatch();
    const { gray0, gray1, gray2, background, light, dark } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            input: [styles.input, { backgroundColor: gray0, color: dark, fontSize: 15, }],
            verifyInput: [styles.input, { backgroundColor: mode === 'light' ? gray0 : background, color: dark, fontSize: 15, }],
            verifyInputContainer: [styles.inputContainer, { width: '100%', marginHorizontal: 0 }]
        }
    }, [mode])
    const { email } = useAppSelector((state) => state.auth);
    const [code, setCode] = useState<string>("");
    const [sheetPositionIndex, setSheetPositionIndex] = useState(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordOld, setPasswordOld] = useState<string>("");
    const [passwordNew, setPasswordNew] = useState<string>("");

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                pressBehavior='none'
            />
        ),
        []
    );

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // const snapPoints = useMemo(() => [80, 250, '75%'], []);
    const snapPoints = useMemo(() => ["30%", "50%", '80%'], []);

    const verifyInputOnFocus = () => {
        if (sheetPositionIndex !== 2) {
            bottomSheetModalRef.current?.expand()
        }
    }
    const handleVerificationCode = async () => {
        const response = await ServerRequests.User({
            route: "/verify",
            body: {
                email: email.trim(),
                OTP: code,
            },
            axiosConfig: {
                headers: {},
            },
        });

        if (response.successful) {
            showMessage({
                message: "Versess",
                description: "OTP sent successfully 🎉",
                type: "success",
                duration: 3000,
            });
            setTimeout(() => {
                bottomSheetModalRef.current?.close();
            }, 1000)
            setLoading(false)
            router.push("/")
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

    const handleVerifyEmail = useCallback(async () => {
        console.log("verify");

        bottomSheetModalRef.current?.present();

        const response = await ServerRequests.User({
            route: "/otp",
            body: {
                email: email.trim(),
                OTP: code,
            },
            axiosConfig: {
                headers: {},
            },
        });

        if (response.successful) {
            console.log("forgot");

            showMessage({
                message: "Versess",
                description: "Email verification sent successfully 🎉",
                type: "success",
                duration: 2000,
            });
        } else {
            showMessage({
                message: "Versess",
                description: "Something went wrong. Try again.",
                type: "danger",
                duration: 2000,
            });
            setLoading(false);
        }
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) {
            bottomSheetModalRef.current?.close()
        }
        setSheetPositionIndex(index);
        // console.log('handleSheetChanges', index);
    }, []);


    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: background }}>
            <BottomSheetModalProvider>
                <CustomNavigationHeader title='Forgot password' />
                <MainContainer>
                    <View>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>
                                Forgot your password? Let's help you reset it.
                                Please verify your email address.
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={style.input}
                                placeholder="Your email address"
                                value={email}
                                onChangeText={(e) => dispatch(updateAuth({ email: e }))}
                                placeholderTextColor={gray2}
                                keyboardAppearance='light'
                            />
                            <View style={{ marginTop: 10 }}>
                                <ButtonLarge onPress={handleVerifyEmail} text="Continue" />
                            </View>
                        </View>
                    </View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        style={styles.sheetStyle}
                        backgroundStyle={{
                            borderRadius: 45, backgroundColor: mode === 'light' ? background : gray0, shadowColor: dark,
                            // borderTopColor: gray1, borderTopWidth: 1,
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.3,

                        }}
                        handleIndicatorStyle={{ backgroundColor: mode === 'dark' ? background : gray0 }}
                        backdropComponent={renderBackdrop}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <View>
                                <Text style={styles.title}>
                                    Verify email
                                </Text>
                            </View>

                            <View style={styles.verifyTextContainer}>
                                <Text style={styles.verifyText}>We just sent a verification code to your email </Text>
                                <Text style={styles.verifyText}>address. Check and verify your email.</Text>
                            </View>
                            <View style={style.verifyInputContainer as any}>
                                <TextInput
                                    style={style.verifyInput}
                                    placeholder="Enter verification code"
                                    value={code}
                                    onChangeText={(text) => setCode(text)}
                                    placeholderTextColor={gray1}
                                    keyboardAppearance='light'
                                    onFocus={verifyInputOnFocus}
                                />
                                <View style={{ marginTop: 5 }}>
                                    <ButtonLarge onPress={handleVerificationCode} text="Verify" />
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </MainContainer>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: 50,
    },
    title: {
        fontSize: fontSize.medium,
        fontWeight: "bold",
        marginTop: 5
    },
    headerTextContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontSize: fontSize.normal,
        fontWeight: "500",
        textAlign: 'center',
        marginHorizontal: '8%'
    },
    inputContainer: {
        marginTop: 40,
        // width: "100%",
        marginHorizontal: 10
    },
    sheetStyle: {

    },
    input: {
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        height: 50,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        // marginHorizontal: 20,
        paddingHorizontal: 20,
        // backgroundColor: Colors.light
    },
    verifyTextContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    verifyText: {
        fontSize: fontSize.normal,
        fontWeight: "500",
        textAlign: 'center',
    },

});
