import { Image, View } from 'react-native';

import getImageUrl from '@/utils/get-img-url';

import { ThemedText } from '../ThemedText';

const ViToEng = ({
    meaning = '',
    example = '',
    type = '',
    url = '',
    phonetic = '',
    hideType = false,
}: {
    meaning: string;
    example: string;
    url?: string;
    type: string;
    phonetic: string;
    hideType?: boolean;
}) => {
    return (
        <View>
            <View style={{ paddingHorizontal: 8 }}>
                <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                    Định nghĩa:{' '}
                </ThemedText>
                <ThemedText
                    style={{
                        fontWeight: 400,
                        fontSize: 16,
                    }}
                >
                    - {meaning}
                </ThemedText>

                {type && !hideType && (
                    <ThemedText
                        type="subtitle"
                        style={{
                            fontSize: 16,
                            marginTop: 12,
                        }}
                    >
                        ({type}) - <ThemedText style={{ fontWeight: 400 }}>{phonetic}</ThemedText>
                    </ThemedText>
                )}
                {example && (
                    <View style={{ marginTop: 12 }}>
                        <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                            Ví dụ:
                        </ThemedText>
                        <ThemedText
                            style={{
                                marginBottom: 12,
                                fontWeight: 400,
                            }}
                        >
                            - {example}
                        </ThemedText>
                    </View>
                )}
            </View>
            {getImageUrl(url) && (
                <Image
                    source={{
                        uri: getImageUrl(url) || '',
                    }}
                    style={{
                        width: 'auto',
                        height: 100,
                    }}
                    resizeMode="contain"
                />
            )}
        </View>
    );
};

export default ViToEng;
