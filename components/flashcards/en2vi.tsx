import { View } from 'react-native';

import { ThemedText } from '../ThemedText';
import TextWithSound from '../text-with-sound';

const EngToVi = ({ text, type, phonetic }: { text: string; type?: string; phonetic?: string }) => {
    return (
        <View>
            <TextWithSound textType="title" text={text} />
            <ThemedText type="subtitle">
                ({type}) <ThemedText style={{ fontWeight: 400, fontSize: 20 }}>{phonetic}</ThemedText>
            </ThemedText>
        </View>
    );
};

export default EngToVi;
