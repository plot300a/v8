import { router } from "expo-router"

export const CustomNavigator = {
    goBack(){
        router.canGoBack()?router.back():router.replace('/');
    }
}
