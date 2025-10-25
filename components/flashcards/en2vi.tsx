import { View } from 'react-native';

import { ThemedText } from '../ThemedText';
import TextWithSound from '../text-with-sound';

const EngToVi = ({ text }: { text: string }) => {
    return (
        <View>
            <TextWithSound textType="title" text={text} />
            <ThemedText type="subtitle">(noun) /ˌvɒlənˈtɪər/</ThemedText>
        </View>
    );
};

export default EngToVi;
