import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GG_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GG_IOS_CLIENT_ID,
    scopes: ['email', 'profile'],
});

export default GoogleSignin;
