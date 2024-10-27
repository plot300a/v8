import { fontSize } from "@/constants/FontSizes";
import { View, StyleSheet, ScrollView, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Trending, VideoPlay } from "@/components/home";
import { getServerEndpoint } from "@/commons/server/routes";




let trendingToday = [
    {
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio laborum. ',
        imageUrl: '',
        title: 'Ghosts Music Project',
        viewCount: 459,
        date: '04-11-2022',
        id: '1',
        type: 'image',
        devImage: require('../../assets/images/todays-trend-1.jpg')
    },
    {
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est eopksio',
        imageUrl: '',
        title: 'Ghana Music Awards 2023',
        viewCount: 24,
        date: '04-11-2022',
        id: '2',
        type: 'image',
        devImage: require('../../assets/images/todays-trnd-2.jpg')
    },
    {
        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deser',
        imageUrl: '',
        title: 'Music Festival Performance',
        viewCount: 13,
        date: '04-11-2022',
        id: '3',
        type: 'image',
        devImage: require('../../assets/images/todays-trend-3.jpg')
    }
]

// trendingToday = [...trendingToday]
trendingToday = [...trendingToday, ...trendingToday, ...trendingToday]

export default function TrendingToday() {
    const [posts, setPosts] = useState(trendingToday);
    useEffect(() => {
        fetch(getServerEndpoint('/api/post/trendingToday'), {
            method: 'GET',
            headers: {}
        }).then(async (response) => {

            const resData = await response.json();
            if (resData.success) {

                const xtract = resData.data.map((post: any, index: any) => {
                    if (!post.files || post.files.length < 1) {
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
                }).filter((post: any) => !!post);
                setPosts([...posts, ...xtract]);
            }

            // console.log(JSON.stringify(data,undefined,2));



        }).catch((reason) => {
            console.log(reason);

        })
    }, [])



    return (
        <FlatList
            data={posts}
            renderItem={({ index, item }) => <Trending {...item} />}
            keyExtractor={(item, index) => `item-${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<ActivityIndicator size={'small'} style={styles.bottomLoader} />}
        />
    );
}

const styles = StyleSheet.create({
    bottomLoader: {
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
