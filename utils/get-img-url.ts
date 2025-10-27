export default function getImageUrl(url: string) {
    if (typeof url !== 'string' || !url) return null;
    if (url.startsWith('http') || url.startsWith('blob')) return url;
    if (url.startsWith('/uploads')) {
        return `${process.env.EXPO_PUBLIC_API_HOST}:${process.env.EXPO_PUBLIC_API_PORT}${url}`;
    } else return null;
}
