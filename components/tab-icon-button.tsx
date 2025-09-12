import { View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { HugeiconsIcon } from '@hugeicons/react-native';

function TabIconButton({ icon: Icon, color, focused }: { icon: any; color: string; focused: boolean }) {
    const glowColor = '#FFD700';
    return (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {focused && (
                <View
                    style={{
                        position: 'absolute',
                        top: -7,
                        width: 28,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: glowColor,
                        shadowColor: glowColor,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.9,
                        shadowRadius: 8,
                        elevation: 10,
                    }}
                />
            )}

            {focused && (
                <LinearGradient
                    colors={['#FFD700aa', '#fbc72bbb', '#ffc22866', 'transparent']} // Golden gradient with natural fade
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                        position: 'absolute',
                        top: -7,
                        width: 50, // Wider for more blur effect
                        height: 35, // Taller for more glow area
                        borderTopRightRadius: 40,
                        borderTopLeftRadius: 40,
                        opacity: 0.5, // Slightly more visible
                        shadowColor: glowColor,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 25, // Increased blur
                        elevation: 25,
                    }}
                />
            )}
            <HugeiconsIcon icon={Icon} size={24} color={color} />
        </View>
    );
}

export default TabIconButton;
