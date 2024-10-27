import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useMemo } from 'react'
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useThemeColor, useThemeMode } from '@/theme';


export default function UploadPlaceholder() {
    const { dark, gray0, gray1, link } = useThemeColor();
    const mode = useThemeMode();

    const style = useMemo(() => {
        return {
            uploadContainer: {
                backgroundColor: mode === "light" ? gray0 : gray0,
            },
            uploadIcon: {
                color: mode === "light" ? gray1 : gray1,
            }
        }
    }, [mode])
    return (
        <View style={styles.container}>
            <View style={[styles.uploadContainer, style.uploadContainer]}>
                <Image
                    style={{ width: 80, height: 80 }}
                    source={require('../assets/images/audio.png')}
                    resizeMode='contain'
                />
            </View>
            <TouchableOpacity style={styles.uploadIcon}>
                <Text><Feather name="upload" size={20} color={gray1} /></Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    uploadContainer: {
        height: 150,
        width: 150,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
    },
    uploadIcon: {
        backgroundColor: Colors.link,
        padding: 7,
        borderRadius: 50,
        position: "absolute",
        bottom: -10,
        // left: '85%',
        left: '65%',
    }
})