import { Image, ImageContentFit } from "expo-image";
import { useMemo } from "react";
import { ImageRequireSource, ImageStyle, ImageURISource, StyleProp, StyleSheet } from "react-native";


type Props = {
    devImage?: ImageURISource | ImageRequireSource
    uri: string;
    style?: StyleProp<ImageStyle>;
    imageAlt?:string;
    imageContentFit?: ImageContentFit
}

export function CustomImageComponent({ uri, style, devImage, imageAlt,imageContentFit }: Props) {
    const memoStyle = useMemo(() => ({
        style: [styles.image, style],
        transition: { timing: 'linear', duration: 200 }
    }), [style]);
    return <Image accessibilityLabel={imageAlt||'An image'} alt={imageAlt||'An image'} contentFit={imageContentFit||'cover'} transition={memoStyle.transition as any} cachePolicy={'memory-disk'} style={memoStyle.style} source={uri || devImage} />
}


const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    }
})