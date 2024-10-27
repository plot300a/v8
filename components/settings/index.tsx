import {
    ImageStyle,
    ImageURISource,
    StyleSheet,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, useThemeColor } from "@/theme";
import { fontSize } from "@/constants/FontSizes";
import { CustomImageComponent } from "@/commons/Image";
import { Colors } from "@/constants/Colors";

export const TabHead = ({ title, active }: { title: string; active?: boolean }) => {
    const { dark, gray1, primary } = useThemeColor();
    const style = useMemo(() => {
        return {
            tabHeadText: (active
                ? {
                    ...styles.tabHeadText,
                    color: dark,
                }
                : {
                    ...styles.tabHeadText,
                    color: gray1,
                }),
                indicator: active?{backgroundColor: primary, height: 3, width: '50%'}:{},

        };
    }, [active]);
    return (
        <TouchableOpacity style={styles.tabHeadContainer}>
            <Text testID="tab-title" style={style.tabHeadText}>{title}</Text>
            {active&&<View style={style.indicator as any}></View>}
        </TouchableOpacity>
    );
};

export const InfoInput = ({
    multiline,
    initValue,
    name,
}: {
    multiline?: boolean;
    initValue?: string;
    name: string;
}) => {
    const { gray2, gray0, dark } = useThemeColor();
    const style = useMemo(() => {
        return {
            infoNameText: {
                color: gray2,
                fontWeight: 'bold',
                marginBottom: 5,
            },
            infonInputBottomBorder: {
                height: 1,
                backgroundColor: gray0,
                width: '100%'
            },
            infonInput:[
                styles.infonInput,
                {
                    color: dark
                }
            ]
        };
    }, [dark]);

    initValue = initValue || "";
    return (
        <View testID={`input-field-${name}`} accessible={true} accessibilityLabel={`Edit ${name}`} style={styles.infoInputContainer}>
            <Text style={style.infoNameText as any}>{name}</Text>
            <TextInput
                multiline={multiline}
                value={initValue}
                style={style.infonInput}
                
            />
            <View style={style.infonInputBottomBorder as any}></View>
        </View>
    );
};

type ProfileInfoProps = {
    username: string;
    location: string;
    bio?: string;
    website?: string;
    folllowing: number;
    followers: number;
    imageUrl?: string;
    devImage?: ImageURISource;
};
export const ProfileInfo = ({
    username,
    imageUrl,
    devImage,
    website,
    location,
    folllowing,
    followers,
    bio,
}: ProfileInfoProps) => {
    const { lightPrimary, gray0, icon, primary } = useThemeColor();
    const style:
        | StyleSheet.NamedStyles<any>
        | { [k: string]: (ViewStyle | TextStyle | ImageStyle)[] } = useMemo(() => {
            return {
                searchButtonContainer: {
                    ...styles.searchButtonContainer,
                    backgroundColor: lightPrimary,
                },
                profileImageContainer: {
                    ...styles.profileImageContainer,
                    backgroundColor: gray0,
                },
            };
        }, [gray0]);
    return (
        <View>
            <View style={styles.firstLine}>
                <View style={style.profileImageContainer}>
                    <CustomImageComponent uri={imageUrl || ""} devImage={devImage} imageAlt={`${username}'s profile image`} />
                </View>
                <TouchableOpacity style={style.searchButtonContainer}>
                    <Ionicons name="search" size={20} color={primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.secondLine}>
                <Text style={styles.nameStyle}>{username}</Text>
                <Text style={styles.bioText}>{bio}</Text>
                <View style={styles.pointedInfo}>
                    <View style={styles.pointedContainer}>
                        <Ionicons name="location" size={16} color={icon} />
                        <Text style={styles.pointedText}>{location}</Text>
                    </View>
                    <TouchableOpacity style={styles.pointedContainer}>
                        <Ionicons name="link-outline" size={16} color={icon} />
                        <Text style={styles.pointedLink}>{website}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.followInfo}>
                    <View style={styles.followItem}>
                        <Text style={styles.followCount}>{followers}</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={styles.followItem}>
                        <Text style={styles.followCount}>{folllowing}</Text>
                        <Text>Following</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export const commonStyles = StyleSheet.create({
    alignRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    alignColumn: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
});

export const styles = StyleSheet.create({
    searchButtonContainer: {
        ...commonStyles.alignRow,
        justifyContent: "center",
        padding: 5,
        borderRadius: 30,
    },
    firstLine: {
        ...commonStyles.alignRow,
        justifyContent: "space-between",
        marginBottom: 15,
    },
    profileImageContainer: {
        width: 62,
        height: 62,
        borderRadius: 20,
    },
    secondLine: {
        width: "90%",
        marginBottom: 15,
    },
    nameStyle: {
        fontWeight: "bold",
        fontSize: fontSize.large,
        marginBottom: 5,
    },
    bioText: {
        fontSize: fontSize.normal,
        marginBottom: 5,
        fontWeight: '500'
    },
    pointedInfo: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
        marginTop: 5
    },
    pointedContainer: {
        ...commonStyles.alignRow,
        marginRight: 10,
    },
    pointedText: {
        fontSize: fontSize.normal,
        marginLeft: 2,
    },
    pointedLink: {
        fontSize: fontSize.normal,
        marginLeft: 2,
        color: Colors.link,
    },
    followInfo: {
        ...commonStyles.alignRow,
        marginBottom: 15,
    },
    followItem: {
        marginRight: 25,
    },
    followCount: {
        fontWeight: "bold",
        fontSize: 15,
    },
    tabHeadScrollContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingVertical: 5,
        marginBottom: 10
    },
    tabHeadContainer: {
        ...commonStyles.alignColumn,
        marginRight: 15,
        marginLeft: -10,
    },
    tabHeadText: {
        fontWeight: "bold",
        fontSize: 15,
        paddingBottom: 5,
    },
    infoInputContainer: {
        marginBottom: 25,
    },
    infonInputNameText: {},
    infonInput: {
        backgroundColor: "rgba(0,0,0,0)",
        width: "100%",
        marginTop: 10,
        marginBottom: 3,
        fontSize: fontSize.normal,
        paddingBottom: 5,
    },
});
