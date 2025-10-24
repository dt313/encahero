import { StyleSheet, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import Button from '../button';

function QuizAction({
    status,
    onMasterWord,
    onSkip,
    isShowMasteredButton,
}: {
    status: string;
    onMasterWord: () => void;
    onSkip: () => void;
    isShowMasteredButton: boolean;
}) {
    const textColor = useThemeColor({}, 'text');

    return (
        <View style={[styles.btnBox, status === 'completed' && { flexDirection: 'row-reverse' }]}>
            {isShowMasteredButton && (
                <Button type="link" onPress={onMasterWord}>
                    🧠 Đã ghi nhớ
                </Button>
            )}
            <Button type="link" textStyle={{ color: textColor }} onPress={onSkip}>
                Bỏ qua →
            </Button>
        </View>
    );
}

export default QuizAction;

const styles = StyleSheet.create({
    btnBox: {
        marginTop: 12,
        marginHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
