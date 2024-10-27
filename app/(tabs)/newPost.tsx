import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainContainer from '@/components/MainContainer'
import CustomHeader from '@/commons/CustomHeader'
import CreatePost from '@/screens/post'

export default function NewPost() {
    return (
        <MainContainer>
            <CustomHeader title='New Post' />
            <CreatePost />
        </MainContainer>
    )
}

const styles = StyleSheet.create({})