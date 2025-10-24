import { useRouter } from 'expo-router';

import { ThemedText } from '../ThemedText';
import Button from '../button';
import SafeArea from '../safe-area';
import ScreenWrapper from '../screen-wrapper';

function NoQuiz() {
    const router = useRouter();
    return (
        <ScreenWrapper>
            <SafeArea style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText type="subtitle" style={{ padding: 16 }}>
                    Have no quiz in this collection
                </ThemedText>
                <Button type="link" onPress={() => router.replace('/')}>
                    Go to home
                </Button>
            </SafeArea>
        </ScreenWrapper>
    );
}

export default NoQuiz;
