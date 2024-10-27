import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContainer from '@/components/MainContainer'
import CustomHeader from '@/commons/CustomHeader'
import Trends from '@/screens/trends'

export default function Trending() {
    return (
       <>
             <MainContainer>
                <CustomHeader title='Trends' />
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    <Trends />
                {/* </ScrollView> */}
            </MainContainer>
       </>
    )
}

const styles = StyleSheet.create({})