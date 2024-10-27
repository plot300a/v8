import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import Today from './Today'

export default function Show({ showPressed }: { showPressed: () => void }) {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.playIcon}>
                    <AntDesign name="play" size={60} color="grey" />
                </View>
                <Image
                    source={require('../../../assets/images/showcase-1.jpg')}
                    style={{ width: '100%', height: 200, borderRadius: 10, position: "relative" }}
                />
            </View>
            <View>
                <Today todayPressed={() => { }} />
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    imageContainer: {
        position: 'relative',
    },
    playIcon: {
        position: "absolute",
        top: 60,
        left: "40%",
        zIndex: 1,
    },
})