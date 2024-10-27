import { fontSize } from "@/constants/FontSizes";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import MainContainer from "@/components/MainContainer";
import { Trending, VideoPlay, WeeklyTop } from "@/components/home";


const devImage = require('../../assets/images/showcase-1.jpg');

export default function ViralShowCase() {

    let weeklyTop = [
        {
            text: 'Excepteur sint occaet cupidat non proido hugc jokn',
            imageUrl: '',
            devImage: require('../../assets/images/trend-now-1.jpg')
        },
        {
            text: 'Excepteur sint occaet dier lop cupidatat non proido',
            imageUrl: '',
            devImage: require('../../assets/images/trend-now-2.jpg')
        },
        {
            text: 'Excepteur sint occaet dier lop cupidatat non proido',
            imageUrl: '',
            devImage: require('../../assets/images/todays-trend-1.jpg')
        }
    ]
    weeklyTop = [...weeklyTop, ...weeklyTop, ...weeklyTop]

    let trendingNow = [
        {
            text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. ',
            imageUrl: '',
            title: 'Ghosts Music Project',
            viewCount: 459,
            date: '04 - 11 - 2022',
            devImage: require('../../assets/images/todays-trend-1.jpg')
        },
        {
            text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio',
            imageUrl: '',
            title: 'Ghana Music Awards 2023',
            viewCount: 24,
            date: '04 - 11 - 2022',
            devImage: require('../../assets/images/todays-trnd-2.jpg')
        },
        {
            text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deser',
            imageUrl: '',
            title: 'Music Festival Performance',
            viewCount: 13,
            date: '04 - 11 - 2022',
            devImage: require('../../assets/images/todays-trend-3.jpg')
        }
    ]

    trendingNow = [...trendingNow, ...trendingNow, ...trendingNow]

    return (
        <ScrollView accessibilityLabel="Viral showcase screen" showsVerticalScrollIndicator={false}>
            
            <VideoPlay source="" devImage={devImage} />
            {
                trendingNow.map((item, index) => <Trending {...item} key={`item-${index}`} />)
            }

            <ActivityIndicator size={'small'} style={styles.bottomLoader} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bottomLoader:{
        marginBottom: 90,
        marginTop: 20
    },
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
