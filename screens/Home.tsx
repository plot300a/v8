import { fontSize } from "@/constants/FontSizes";
import { View, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signOut } from "firebase/auth";
import MainContainer from "@/components/MainContainer";
import { Text, useThemeColor } from "@/theme";
import { Colors } from "@/constants/Colors";
import { updateAuth } from "@/store/slice/auth";
import { auth } from "@/firebase/firebase";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";
import { AntDesign, Octicons } from '@expo/vector-icons';
import VersessLogo from "@/components/VersessLogo";
import { Trending, VideoPlay, WeeklyTop } from "@/components/home";
import { getServerEndpoint } from "@/commons/server/routes";


const devImage = require('../assets/images/showcase-1.jpg');
let trendingToday = [
    {
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. ',
        imageUrl: '',
        title: 'Ghosts Music Project',
        viewCount: 459,
        date: '04-11-2022',
        id: '1',
        type: 'image',
        devImage: require('../assets/images/todays-trend-1.jpg')
    },
    {
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio',
        imageUrl: '',
        title: 'Ghana Music Awards 2023',
        viewCount: 24,
        date: '04-11-2022',
        id: '2',
        type: 'image',
        devImage: require('../assets/images/todays-trnd-2.jpg')
    },
    {
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deser',
        imageUrl: '',
        title: 'Music Festival Performance',
        viewCount: 13,
        date: '04-11-2022',
        id: '3',
        type: 'image',
        devImage: require('../assets/images/todays-trend-3.jpg')
    }
]

trendingToday = [...trendingToday, ...trendingToday, ...trendingToday]

export default function HomeScreen() {
    const { gray0 } = useThemeColor()
    const [todaysTrends,setTodaysTrends] = useState(trendingToday)

    useEffect(()=>{
        fetch(getServerEndpoint('/api/post/trendingToday'),{
            method: 'GET',
            headers:{}
        }).then(async (response)=>{
            
            const resData = await response.json();
            // console.log(data);
            if(resData.success){
                
                const xtract = resData.data.map((post:any,index:any)=>{
                    if(!post.files||post.files.length<1){
                        return null;
                    }
                    return {
                        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deser',
                        imageUrl: getServerEndpoint(`/media/${post.files[0].name}`),
                        title: 'Music Festival Performance',
                        viewCount: post.views,
                        date: '04-11-2022',
                        devImage: undefined,
                        type: post.files[0].type,
                    }
                }).filter((post:any)=>!!post)
                setTodaysTrends([...todaysTrends, ...xtract]);
            }
            
            // console.log(JSON.stringify(data,undefined,2));

            
            
        }).catch((reason)=>{
            console.log(reason);
            
        })
    },[])



    let weeklyTop = [
        {
            text: 'Excepteur sint occaet cupidat non proido hugc jokn',
            imageUrl: '',
            devImage: require('../assets/images/trend-now-1.jpg')
        },
        {
            text: 'Excepteur sint occaet dier lop cupidatat non proido',
            imageUrl: '',
            devImage: require('../assets/images/trend-now-2.jpg')
        },
        {
            text: 'Excepteur sint occaet dier lop cupidatat non proido',
            imageUrl: '',
            devImage: require('../assets/images/todays-trend-1.jpg')
        }
    ]
    weeklyTop = [...weeklyTop, ...weeklyTop, ...weeklyTop]

  

    return (
        <MainContainer>
            <View style={styles.headerContainer}>
                <View>
                    <Image
                        source={require('../assets/images/user.png')}
                        style={styles.image}
                    />
                </View>
                <VersessLogo />
                <View>
                    <Octicons name="video" size={30} color={gray0} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: 20 }}>
                    <Text style={styles.heading}>Trending Now</Text>
                </View>
                <ScrollView contentContainerStyle={{
                    // marginHorizontal: 15,
                    // paddingVertical: 20
                }} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        weeklyTop.map((item, index) => <WeeklyTop {...item} key={`item-${index}`} />)
                    }
                </ScrollView>

                <View style={{ paddingTop: 20 }}>
                    <Text style={styles.heading}>Viral Showcase</Text>
                </View>
                <VideoPlay source="" devImage={devImage} />
                <View style={{marginTop: 20}}>
                    <Text style={[styles.heading, { marginBottom: 0 }]}>Today's Trend</Text>
                </View>
                {
                    todaysTrends.map((item, index) => <Trending {...item} key={`item-${item.id}-${index}`} />)
                }
                {/* <TouchableOpacity onPress={OpenModal}>
                    <Text
                        style={{
                            fontSize: fontSize.medium,
                            marginTop: 35,
                            color: Colors.link,
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity> */}

                <ActivityIndicator size={'small'} style={{ marginVertical: 20 }} />
            </ScrollView>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    logo: {
        fontSize: fontSize.large,
        fontWeight: "bold",
    },
    heading: {
        fontSize: fontSize.medium,
        fontWeight: 'bold',
        marginBottom: 10
    },
    viralImage: {
        borderRadius: 5,
        backgroundColor: 'red',
        marginTop: 10,
    },
    playIcon: {
        position: "absolute",
        top: 60,
        left: "40%",
        zIndex: 1,
    },
})
