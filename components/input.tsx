import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { useThemeColors } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

type InputProps = {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
} & TextInputProps;

function Input({ label, value, onChangeText, ...rest }: InputProps) {
    const colors = useThemeColors();

    return (
        <View>
            {label && <ThemedText style={styles.label}>{label}</ThemedText>}
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.authInputBackground,
                        color: colors.black,
                    },
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#A0A0A0"
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        marginBottom: 4,
        fontWeight: '500',
        color: '#8b8b8bff',
        letterSpacing: 0.3,
        fontSize: 14,
    },
    input: {
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: 500,
    },
});

export default Input;
