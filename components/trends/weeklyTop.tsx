import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View, ViewBase } from "react-native";
import { VideoPlay, WeeklyTop } from "../home";
import { screenWidth } from "@/constants/Window";
import { useThemeColor, useThemeMode } from "@/theme";



const devImage = require('../../assets/images/trend-video.png')

export default function WeeklyTopTrends({ weeklyPressed }: { weeklyPressed?: () => void }) {
    let width = 0;
    if (screenWidth > 400) {
        width = (screenWidth - 40) / 3;
    } else {
        width = (screenWidth - 40) / 2;
    }
    width = width - 3;

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
        },
        {
            text: 'Excepteur sint occaet dier lop cupidatat non proido',
            imageUrl: '',
            devImage: require('../../assets/images/t9.png')
        },
        {
            text: 'Excepteur sint occaet dier lop cupidatat non proido',
            imageUrl: '',
            devImage: require('../../assets/images/t7.png')
        },
        {
            text: 'Excepteur sint occaet cupidat non proido hugc jokn',
            imageUrl: '',
            devImage: require('../../assets/images/t8.png')
        },
        {
            text: 'Excepteur sint occaet dier lop cupidatat non proido',
            imageUrl: '',
            devImage: require('../../assets/images/t6.png')
        },
        {
            text: 'Excepteur sint occaet cupidat non proido hugc jokn',
            imageUrl: '',
            devImage: require('../../assets/images/t5.png')
        },
        {
            text: 'Excepteur sint occaet dier lop cupidatat non proido',
            imageUrl: '',
            devImage: require('../../assets/images/t4.png')
        },
    ];

    return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '40%', width: '100%' }}
            >
                <View style={{flex:1}}>
                    <VideoPlay source="" devImage={devImage} />
                    <View accessibilityLabel="Weekly Top trending posts" style={styles.trendsContainer}>
                        {
                            weeklyTop.map((item, index) => {
                                const marginRight = index%3===2?'0%':'3%'
                                const marginLeft = index%3===0?'2%':'0%';
                                return <WeeklyTop {...item} width={'30%'} marginLeft={marginLeft} marginBottom={10} marginRight={marginRight} key={`item-${index}`} />
                            })
                        }
                    </View>
                </View>
            </ScrollView>
    )
}




const styles = StyleSheet.create({
    trendsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        // paddingLeft: 10,
        // paddingRight: 0,
        paddingBottom: 30,
        paddingTop: 15,
    }
})

