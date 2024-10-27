import { CustomImageComponent } from "@/commons/Image";
import { fontSize } from "@/constants/FontSizes"
import { Text, useThemeColor } from "@/theme";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useMemo, useRef, useState } from "react";
import { ImageURISource, Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native"

export const WeeklyTop = ({ text, imageUrl, devImage, width, marginBottom, marginRight, marginLeft }: { text?: string; imageUrl: string; devImage?: number | ImageURISource; width?: number|string; marginRight?: number|string; marginLeft?: number|string; marginBottom?: number }) => {
    const { gray0 } = useThemeColor();
    const style = useMemo(() => {
        return {
            topsImageContainer: {
                ...styles.topsImageContainer,
                backgroundColor: gray0,
            },
            topsContainer: {
                ...styles.topsContainer,
                width: width || 160,
                marginRight: marginRight || 20,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
            }
        } as { [k: string]: StyleProp<ViewStyle> | TextStyle }
    }, [gray0,marginRight,marginBottom,marginLeft])

    return (
        <Pressable style={style.topsContainer} accessibilityLabel="Press to view post">
            <View style={style.topsImageContainer}>
                <CustomImageComponent uri={imageUrl} devImage={devImage} imageAlt="Post's image banner" />
            </View>
            <View style={styles.topsTextContainer}>
                <Text style={styles.topsText}>{text}</Text>
            </View>
        </Pressable>
    )
}

type TrendsProp = {
    id: string;
    type: string,
    title: string;
    text?: string;
    imageUrl: string;
    viewCount: number;
    date: string;
    devImage?: number | ImageURISource
}

export const Trending = ({ text, imageUrl, title, viewCount, date, devImage, id, type }: TrendsProp) => {
    const { gray0, icon, gray2 } = useThemeColor();
    const style = useMemo(() => {
        return {
            trendsImageContainer: {
                backgroundColor: gray0,
                ...styles.trendsImageContainer
            },
            trendsDateText: {
                color: icon,
                ...styles.trendsDateText
            },
            trendsViewCountText: {
                color: icon,
                ...styles.trendsViewCountText
            }
        } as { [k: string]: StyleProp<ViewStyle> | TextStyle }
    }, [gray0])

    return (
        <Pressable accessibilityLabel="Press to view post" style={styles.trendsContainer}>
            <View style={style.trendsImageContainer}>
                {
                    type === 'image'?
                    <CustomImageComponent uri={imageUrl} devImage={devImage} imageAlt="Post's image" />
                    :
                    <VideoPlay source={imageUrl} takeParentContainerShape={true} />
                }
            </View>
            
            <View style={styles.trendsInfoContainer}>
                <Text style={styles.infoHeading}>{title}</Text>
                <Text>{text}</Text>
                <View style={styles.trendsIconContainer}>
                    <Ionicons name='eye' size={16} color={icon} />
                    <Text style={style.trendsViewCountText}>{viewCount}</Text>
                    <Text style={style.trendsDateText}>{date}</Text>
                </View>
            </View>
        </Pressable>
    )
}

type VideoPlayProps = {
    source: string;
    devImage?: ImageURISource | undefined;
    takeParentContainerShape?:boolean;
}
export const VideoPlay = ({ source, devImage, takeParentContainerShape }: VideoPlayProps) => {
    const { gray0 } = useThemeColor();
    const [status,setStatus] = useState<AVPlaybackStatus>({} as any);
    const videoRef = useRef<Video>(null);
    const style = useMemo(() => {
        return {
            container: !takeParentContainerShape?{
                borderRadius: 5,
                backgroundColor: gray0,
                marginTop: 5,
                marginBottom: 10,
                height: 210,
                overflow: 'hidden',
            }:{
                width: "100%",
                height: "100%",
                position: "absolute",
            }
        }
    }, [gray0]);

    const onPlayPause = ()=>{
        (status as any).isPlaying ? videoRef.current?.pauseAsync() : videoRef.current?.playAsync()
    }
    const  onPlaybackStatusUpdate = (stats:AVPlaybackStatus)=>{
        // console.log(stats);
        
        setStatus(() => stats)
    }
    return (
        <View style={style.container as any}>
            
            {
                devImage?
                <CustomImageComponent uri={''} devImage={devImage} />
                :
                <Video
                    ref={videoRef}
                    source={{ uri: source||'null' }}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={true}
                    isLooping
                    style={{ flex: 1 }}
                    useNativeControls={false}
                    onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                />
            }
            <View style={styles.playIcon}>
                    <Pressable onPress={onPlayPause} style={{
                        backgroundColor:  'rgba(0, 0, 0, 0.6)', 
                        borderRadius: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        width: 45,
                        height: 45,
                        
                    }} >
                        {
                            (status as any).isPlaying?
                            <AntDesign name='pause' size={28} color="white" />
                            :
                            <AntDesign name='play' size={45} color="white" style={{
                                width: 45,
                                height: 45,
                                borderRadius: 60,
                            }} />
                        }
                        
                    </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topsContainer: {
        marginVertical: 5,
        marginRight: 20,
        width: 160,
    },
    topsImageContainer: {
        borderRadius: 5,
        width: '100%',
        height: 110,
    },
    topsTextContainer: {
        marginTop: 5
    },
    topsText: {
        fontSize: fontSize.normal
    },
    playIcon: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom:0,
        alignItems:'center',
        justifyContent: 'center',
        width: '100%'

    },
    heading: {
        fontSize: fontSize.medium,
        fontWeight: "bold",
    },
    trendsContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    trendsImageContainer: {
        borderRadius: 5,
        width: 135,
        height: 90,
        marginRight: 10,
        overflow:'hidden'
    },
    trendsInfoContainer: {

    },
    trendsIconContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    trendsViewCountText: {
        fontSize: fontSize.small,
        marginRight: 15
    },
    trendsDateText: {
        fontSize: fontSize.small,
    },
    infoHeading: {
        fontSize: fontSize.normal,
        fontWeight: "bold",
        marginBottom: 5
    }
})