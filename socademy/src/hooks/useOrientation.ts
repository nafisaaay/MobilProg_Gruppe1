import { useWindowDimensions } from 'react-native';

export default function useOrientation() {
    const { width, height } = useWindowDimensions();
    const landscapeMode = width > height;

    return (
        { width , height, landscapeMode }
    );
}
