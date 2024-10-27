import type { ScaledSize } from "react-native";
import { Dimensions } from "react-native";
import { Platform } from "react-native";

export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isWeb = Platform.OS === "web";
export const window: ScaledSize =  Dimensions.get("window");
export const {width:screenWidth,height: screenHeight} = window;