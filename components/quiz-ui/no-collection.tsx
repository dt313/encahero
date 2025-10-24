import { ThemedText } from '../ThemedText';
import FastRegister from '../fast-register';
import SafeArea from '../safe-area';
import ScreenWrapper from '../screen-wrapper';

function NoCollection() {
    return (
        <ScreenWrapper>
            <SafeArea style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText type="subtitle" style={{ textAlign: 'center', padding: 16 }}>
                    Bạn chưa đăng kí bài học nào ! Đăng kí bài học nhanh bên dưới
                </ThemedText>
                <FastRegister />
            </SafeArea>
        </ScreenWrapper>
    );
}

export default NoCollection;
