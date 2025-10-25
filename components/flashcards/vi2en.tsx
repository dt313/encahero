import { Image, View } from 'react-native';

import { ThemedText } from '../ThemedText';

const ViToEng = ({
    meaning = '',
    example = '',
    type = '',
    url = "'",
}: {
    meaning: string;
    example: string;
    url?: string;
    type: string;
}) => {
    return (
        <View>
            <View>
                <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                    Định nghĩa:{' '}
                </ThemedText>

                <ThemedText
                    style={{
                        fontWeight: 400,
                    }}
                >
                    {meaning}
                </ThemedText>
                {type && (
                    <ThemedText
                        type="subtitle"
                        style={{
                            fontSize: 16,
                            marginVertical: 12,
                        }}
                    >
                        {type}
                    </ThemedText>
                )}
                {example && (
                    <View>
                        <ThemedText type="subtitle" style={{ fontSize: 18 }}>
                            Ví dụ:
                        </ThemedText>
                        <ThemedText
                            style={{
                                marginBottom: 12,
                                fontWeight: 400,
                            }}
                        >
                            {example}
                        </ThemedText>
                    </View>
                )}
            </View>

            <Image
                source={{
                    uri: 'https://www.shutterstock.com/shutterstock/photos/795957880/display_1500/stock-photo-female-hands-holding-young-green-plant-on-black-isolated-background-nature-growth-and-care-795957880.jpg',
                }}
                style={{
                    width: 'auto',
                    height: 100,
                }}
                resizeMode="contain"
            />
        </View>
    );
};

export default ViToEng;
