import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import ButtonSmall from '@/commons/ButtonSmall';
import { Colors } from '@/constants/Colors';
import { useThemeColor, useThemeMode } from '@/theme';


const UploadModal = ({ content }: { content: React.JSX.Element }) => {
    const { gray0, gray1, gray2, background, light, dark } = useThemeColor();
    const mode = useThemeMode();


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // const snapPoints = useMemo(() => ['25%', '50%'], []);
    const snapPoints = useMemo(() => ["60%", "70%", "80%"], []);

    const style = useMemo(() => {
        return {
            header: {
                color: mode === "light" ? dark : dark,
            },
        }
    }, [mode])



    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    // const renderBackdrop = useCallback(
    //     (props: any) => <BottomSheetBackdrop {...props} pressBehavior="none" />,
    //     []
    // );

    return (
        <BottomSheetModalProvider>
            <View style={styles.buttonContainer}>
                <Text style={[styles.header, style.header]}>Upload New Audio File</Text>
                <View style={styles.button}>
                    <ButtonSmall text='Upload' onPress={handlePresentModalPress} />
                </View>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{
                    borderRadius: 33,
                    backgroundColor: mode === "light" ? background : gray0,
                    shadowColor: dark,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                }}
                handleIndicatorStyle={{
                    backgroundColor: mode === "dark" ? background : gray0,
                }}
            // backdropComponent={renderBackdrop}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <View>
                        {content}
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },
    button: {
        width: "50%",
    },
});

export default UploadModal;