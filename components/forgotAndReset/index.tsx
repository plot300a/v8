import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import MainContainer from "@/components/MainContainer";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { fontSize } from "@/constants/FontSizes";
import { Colors } from "@/constants/Colors";
import ButtonLarge from "@/commons/ButtonLarge";


interface Props {
    onPress: () => void;
    text: string;
    subtext: string;
    buttonText: string;
    link: string;
    // textInputComp: (props: any) => JSX.Element | null;
}

const ForgotAndReset: React.FC<Props> = ({ text, subtext, onPress, buttonText, link, }) => {
    const [email, setEmail] = useState<string>();

    const toggleVerifyEmail = () => {
        console.log("h");
    }

    return (
        <MainContainer>
            {/* <BottomSheetModalProvider> */}
            <SafeAreaView style={styles.headerContainer}>
                <View style={styles.icon}>
                    <Link href={"/register/"}>
                        <Ionicons name="chevron-back-sharp" size={30} color="black" />
                    </Link>
                </View>
                <View>
                    <Text style={styles.title}>
                        {text}
                    </Text>
                </View>
                <View></View>
            </SafeAreaView>

            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>
                    {text}
                </Text>
                <Text style={styles.headerText}>{subtext}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Your email address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={Colors.grey}
                />

                <ButtonLarge onPress={onPress} text={buttonText} />
            </View>
        </MainContainer >
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: 50,
    },
    title: {
        fontSize: fontSize.large,
        fontWeight: "bold",
    },
    headerTextContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: Colors.dark,
        fontSize: fontSize.normal,
        fontWeight: "500",
    },
    inputContainer: {
        marginTop: 20,
        width: "100%",
    },
    input: {
        backgroundColor: Colors.gray,
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        height: 50,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ForgotAndReset;
