import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React, { useMemo } from "react";
import MainContainer from "@/components/MainContainer";
import trendViral from "@/commons/data/trends-viral";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { fontSize } from "@/constants/FontSizes";
import { Colors } from "@/constants/Colors";
import trendGo from "@/commons/data/go-bottom-data";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { screenHeight } from "@/constants/Window";
import { useThemeColor } from "@/theme";
import { CustomImageComponent } from "@/commons/Image";

export default function GoViral({
    viralPressed,
}: {
    viralPressed: () => void;
}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <ViralPost />
            <ViralPost />
        
             {/* <View style={styles.ImageBackgroundContainer}>
                {trendViral.map((item, index) => (
                    
                ))}
            </View> */}
            <ActivityIndicator size={'small'} style={styles.bottomLoader} />
        </ScrollView>
    );
}

const ViralPost = ()=>{
    const {gray0} = useThemeColor();
    const style = useMemo(()=>{
        return {
            container: [
                viralStyle.container,
                {
                    backgroundColor: gray0
                }
            ]
        }
    },[gray0]);

    const item = trendViral[0];

    return (
        <View style={style.container}>
            <CustomImageComponent uri="" devImage={item.image} />
             <View style={styles.playIcon}>
                <AntDesign name="play" size={60} color="white" />
            </View>
            <View style={{
                justifyContent: "space-between",
                flex: 1,
                padding: 10,
            }}>
                <View style={styles.topIcons}>
                    <View style={styles.icons}>
                        <Text>
                            <MaterialIcons
                                name="live-tv"
                                size={fontSize.normal}
                                color="white"
                            />{" "}
                        </Text>
                        <Text style={styles.iconText}>live</Text>
                    </View>
                    <View style={styles.icons}>
                        <Text>
                            <AntDesign
                                name="eyeo"
                                size={fontSize.normal}
                                color="white"
                            />{" "}
                        </Text>
                        <Text style={styles.iconText}>{item.views}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.reviewsGroup}>
                        {trendGo.map((item, index) => (
                            <View key={index} style={styles.reviewContainer}>
                                <View style={styles.reviewImage}>
                                    <Image
                                        source={item.image}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 18,
                                        }}
                                    />
                                </View>
                                <View style={styles.reviewText}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.subTitle}>{item.text}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View>
                        <View style={styles.share}>
                            <Text>
                                <FontAwesome name="share" size={24} color="white" />
                            </Text>
                            <Text style={styles.text}>18.1k</Text>
                        </View>
                        <View style={styles.share}>
                            <Text>
                                <FontAwesome5 name="heart" size={24} color="white" />
                            </Text>
                            <Text style={styles.text}>26k</Text>
                        </View>
                        <View style={styles.share}>
                            <Text>
                                <FontAwesome
                                    name="comment"
                                    size={24}
                                    color={Colors.secondary}
                                />{" "}
                            </Text>
                            <Text style={styles.text}>18.1k</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}


let height = screenHeight - (screenHeight*0.25);
if(height>550){
    height = 550;
}

const viralStyle = StyleSheet.create({
    
    container:{
        height: height,
        marginHorizontal: 5,
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden'
    }
})

const styles = StyleSheet.create({
    bottomLoader:{
        marginBottom: 90,
        marginTop: 10
    },
    ImageBackgroundContainer: {
        // flex: 1,
    },
    ImageBackground: {
        flex: 1,
        height: 600,
        // height: '100%',
        width: "100%",
        marginBottom: 10,
    },
    topIcons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    icons: {
        flexDirection: "row",
        backgroundColor: Colors.secondary,
        paddingVertical: 1,
        paddingHorizontal: 7,
        borderRadius: 17,
    },
    iconText: {
        fontSize: fontSize.small,
        color: Colors.light,
    },
    playIcon: {
        position: "absolute",
        zIndex: 1,
        top: 0, 
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    reviewsGroup: {
        width: "70%",
    },
    reviewContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    reviewImage: {
        marginRight: 10,
    },
    text: {
        color: Colors.light,
        fontSize: fontSize.xSmall,
    },
    reviewText: {
        width: "70%",
    },
    share: {
        marginVertical: 15,
    },
    title: {
        fontSize: fontSize.small,
        fontWeight: "bold",
        color: Colors.light,
    },
    subTitle: {
        fontSize: fontSize.xSmall,
        color: Colors.light,
    },
});
