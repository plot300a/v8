import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AppThemeProvider, useThemeColor, useThemeMode } from '@/theme';
import { store } from "../store/store";
import { Provider as ReduxProvider } from "react-redux";
import FlashMessage from 'react-native-flash-message';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    Lato: require('../assets/fonts/Lato-Regular.ttf'),
    Plex: require('../assets/fonts/IBMPlexSans-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    ...FontAwesome.font,
  });




  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return <RootLayoutNav />;
}




function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <ReduxProvider store={store}>
          <App />
          <TopStatusBar />
          <FlashMessage position="top" />
        </ReduxProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  )
};


function TopStatusBar() {
  const mode = useThemeMode();
  return <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
}

function App({ }) {
  const { background } = useThemeColor();
  return (
    <View style={{ backgroundColor: background, flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  )
}



