import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";
import { useAppSelector } from "@/store/hooks";
import RegistrationScreen from "@/screens/registration";
import { useThemeColor } from "@/theme";


export default function TabLayout() {
  const { background, icon, secondary } = useThemeColor()
  const { email, password, userInfo, } = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<boolean>(true);

  if (!user) {
    return <RegistrationScreen />
  }

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor: background,
        borderTopWidth: 1,
        borderTopColor: background,
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          // href: null,
          tabBarInactiveTintColor: icon,
          tabBarActiveTintColor: secondary,
          tabBarIcon: (props: { size: number }) => (
            <MaterialCommunityIcons name="home-variant" {...props} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="newPost"
        options={{
          title: "",
          tabBarInactiveTintColor: icon,
          tabBarActiveTintColor: secondary,
          tabBarIcon: (props: { size: number }) => (
            <MaterialIcons name="add-circle" {...props} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="trending"
        options={{
          title: "",
          tabBarInactiveTintColor: icon,
          tabBarActiveTintColor: secondary,
          tabBarIcon: (props: { size: number }) => (
            <FontAwesome6 name="fire-flame-curved" {...props} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarInactiveTintColor: icon,
          tabBarActiveTintColor: secondary,
          tabBarIcon: (props: { size: number }) => (
            <FontAwesome {...props} size={24} name="cog" />
          ),
        }}
      />
      <Tabs.Screen
        name="main"
        options={{
          title: "",
          href: null,
          tabBarInactiveTintColor: icon,
          tabBarActiveTintColor: secondary,
          tabBarIcon: (props: { size: number }) => (
            <FontAwesome {...props} size={24} name="cog" />
          ),
        }}
      />
    </Tabs>
  );
}


