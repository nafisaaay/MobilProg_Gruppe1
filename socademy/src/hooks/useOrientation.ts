import { useWindowDimensions } from 'react-native';

export default function useOrientation() {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const isTablet = Math.min(width, height) >= 740;
    const isPhoneLandscape = isLandscape && !isTablet;

    return (
        { width , height, isLandscape, isTablet, isPhoneLandscape }
    );
}
