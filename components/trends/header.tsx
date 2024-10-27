import { Colors } from "@/constants/Colors";
import { fontSize } from "@/constants/FontSizes";
import { Text, useThemeColor, useThemeMode } from "@/theme";
import React, { useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import ViralShowcase from "./viralShowcase";
import GoViral from "./trendPageButton/GoViral";
import Today from "./trendPageButton/Today";
import Show from "./trendPageButton/Show";
import WeeklyTopTrends from "./weeklyTop";
import ViralShowCase from './showcase'
import TrendingToday from "./trending";
import ButtonLarge from "@/commons/ButtonLarge";
import { ToggleableButton } from "@/commons/ButtonToggler";

export const TrendsButtons = () => {
    const mode = useThemeMode();
    const Colors = useThemeColor();
    const { background } = Colors;
    const [currentScreen, setCurrentScreen] = useState<
        "go-viral" | "weekly-top-10" | "trending-today" | "viral-showcase"
    >("go-viral");

    const toggleScreen = () => {
        switch (currentScreen) {
            case "go-viral":
                setCurrentScreen("weekly-top-10");
                break;
            case "weekly-top-10":
                setCurrentScreen("trending-today");
                break;
            case "trending-today":
                setCurrentScreen("viral-showcase");
                break;
            case "viral-showcase":
                setCurrentScreen("go-viral");
                break;
            default:
                break;
        }
    };

    const activeButtonStyle = {
        backgroundColor: Colors.lightPrimary,
        borderWidth: 1,
        borderColor: Colors.secondary,
    };
    const nonActiveButtonStyle = {
        backgroundColor: Colors.light,
        borderWidth: 1,
        borderColor: Colors.gray0,
    };

    // const isAudioScreen = currentScreen === "music";
    return (
        <View style={{}}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginBottom: 10
                }}
            >
                <TabButtons active={currentScreen==='go-viral'} title="Go Viral" onPress={() => setCurrentScreen('go-viral')} />
                <TabButtons active={currentScreen==='weekly-top-10'} title=" Weekly Top 10" onPress={() => setCurrentScreen('weekly-top-10')} />
                <TabButtons active={currentScreen==='trending-today'} title="Trending Today" onPress={() => setCurrentScreen("trending-today")} />
                <TabButtons active={currentScreen==='viral-showcase'} title="Viral Showcase" onPress={() => setCurrentScreen("viral-showcase")} />
            </ScrollView>
            
            {currentScreen === "go-viral" && <GoViral viralPressed={toggleScreen} />}
            {currentScreen === "weekly-top-10" && <WeeklyTopTrends weeklyPressed={toggleScreen} /> }
            
            {currentScreen === "trending-today" && <TrendingToday/>}
            {currentScreen === "viral-showcase" && <ViralShowCase />}
        </View>
    );
};


const TabButtons = ToggleableButton;


const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: "row",
    },
    navButton:{
        marginHorizontal: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
});