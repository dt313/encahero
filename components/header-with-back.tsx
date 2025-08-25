import { StyleSheet, View } from 'react-native';

import { useRouter } from 'expo-router';

import { ThemedText } from './ThemedText';
import BackIcon from './back-icon';

function HeaderWithBack({ title }: { title: string }) {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
    return (
        <View style={styles.header}>
            <BackIcon onPress={handleBack} />
            <ThemedText type="title" style={styles.title}>
                {title}
            </ThemedText>
        </View>
    );
}

export default HeaderWithBack;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 24,
    },
    title: {
        fontSize: 22,
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
});
