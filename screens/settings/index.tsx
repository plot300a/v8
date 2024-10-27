import {
    ImageStyle,
    ImageURISource,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import MainContainer from "@/components/MainContainer";
import CustomHeader from "@/commons/CustomHeader";
import { Text, useThemeColor } from "@/theme";
import { fontSize } from "@/constants/FontSizes";
import { CustomImageComponent } from "@/commons/Image";
import { InfoInput, ProfileInfo, TabHead, styles, commonStyles } from "@/components/settings";

const devUserImage = require('../../assets/images/user.png')

export default function SettingsScreen() {
    const { lightPrimary, gray0, icon, primary } = useThemeColor();
    const style:
        | StyleSheet.NamedStyles<any>
        | { [k: string]: (ViewStyle | TextStyle | ImageStyle)[] } = useMemo(() => {
            return {
                profileImageContainer: {
                    ...styles.profileImageContainer,
                    backgroundColor: gray0,
                },
                saveButtonContainer: {
                    ...commonStyles.alignRow,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    borderRadius: 15,
                    borderColor: primary,
                    borderWidth: 1,
                },
                saveText: {
                    color: primary,
                    fontSize: fontSize.normal,
                },
                imageTop:{
                    position:'absolute',top:0,
                    bottom:0,right:0,left:0,
                    backgroundColor:lightPrimary,
                    borderRadius: 20
                },
            };
        }, [gray0]);

    // Some needed data
    const imageUrl = "",
    devImage = devUserImage,
    username="Alexander Moore",
    bio="Welcome to the official account of the world's largest music streaming hub.",
    website="www.versess.com",
    followers=534,
    folllowing=54,
    location="Accra, Ghana";

    return (
        <MainContainer>
            <CustomHeader title="Settings" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileInfo
                    username={username}
                    bio={bio}
                    imageUrl={imageUrl}
                    website={website}
                    followers={followers}
                    folllowing={folllowing}
                    location={location}
                    devImage={devImage}
                />

                <ScrollView
                    contentContainerStyle={styles.tabHeadScrollContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <TabHead title="Posts" active={false} />
                    <TabHead title="Profile Details" active={!false} />
                    <TabHead title="Payment Method" active={false} />
                    <TabHead title="Subscription" active={false} />
                    <TabHead title="Help" active={false} />
                </ScrollView>
                <View>
                    <View style={styles.firstLine}>
                        <View style={style.profileImageContainer}>
                            <CustomImageComponent uri={imageUrl || ""} devImage={devImage} style={{opacity: 0.5}} />
                            <Pressable testID="profile-image-update-button" style={style.imageTop}>

                            </Pressable>
                        </View>
                        <TouchableOpacity testID="save-button" style={style.saveButtonContainer}>
                            <Text style={style.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <InfoInput name="Name" initValue={username} />
                        <InfoInput
                            name="Bio"
                            multiline={true}
                            initValue={bio}
                        />
                        <InfoInput name="Website" initValue={website} />
                        <InfoInput name="Location" initValue={location} />
                        <InfoInput name="Pronouns" initValue="Add pronouns" />
                    </View>
                </View>
            </ScrollView>
        </MainContainer>
    );
}