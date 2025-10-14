export default function getAvatarOfUser(url: string) {
    if (!url) {
        return null;
    }
    if (url.startsWith('http')) {
        return url;
    } else {
        return `${process.env.EXPO_PUBLIC_API_HOST}:${process.env.EXPO_PUBLIC_API_PORT}${url}`;
    }
}
