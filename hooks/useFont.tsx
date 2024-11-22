import * as Font from 'expo-font';

export const useFonts = async () => {
    await Font.loadAsync({
        'Teachers-Regular': require('../assets/fonts/Teachers-Regular.ttf'),
        'Teachers-Bold': require('../assets/fonts/Teachers-Bold.ttf'),
        'Teachers-Medium': require('../assets/fonts/Teachers-Medium.ttf'),
        'Teachers-SemiBold': require('../assets/fonts/Teachers-SemiBold.ttf'),
    });
}