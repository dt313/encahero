import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BookOpen02Icon, Settings01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from '../ThemedText';

type QuizHeaderProps = {
    collectionName?: string;
    onOpenList: () => void;
    onOpenSetting: () => void;
};

function QuizHeader({ collectionName, onOpenList, onOpenSetting }: QuizHeaderProps) {
    const mainBoxBg = useThemeColor({}, 'mainBoxBg');
    const shadowColor = useThemeColor({}, 'shadowColor');
    const textColor = useThemeColor({}, 'text');
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={[styles.btnWrap, { backgroundColor: mainBoxBg, shadowColor }]}
                onPress={onOpenList}
            >
                <HugeiconsIcon icon={BookOpen02Icon} size={24} color={textColor} />
            </TouchableOpacity>
            <ThemedText type="subtitle" style={styles.headerName} numberOfLines={1} ellipsizeMode="tail">
                {collectionName ?? 'No Name'}
            </ThemedText>
            <TouchableOpacity
                style={[styles.btnWrap, { backgroundColor: mainBoxBg, shadowColor }]}
                onPress={onOpenSetting}
            >
                <HugeiconsIcon icon={Settings01Icon} size={24} color={textColor} />
            </TouchableOpacity>
        </View>
    );
}

export default QuizHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginBottom: 12,
    },

    headerName: {
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 24,
        textTransform: 'capitalize',
    },

    btnWrap: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        // Shadow Android
        elevation: 1,
    },
});
