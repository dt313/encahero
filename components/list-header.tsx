import { useEffect, useRef, useState } from 'react';

import { Animated, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Cancel01FreeIcons, Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

function ListHeader() {
    const [isSearching, setIsSearching] = useState(false);
    const white = useThemeColor({}, 'white');
    const textColor = useThemeColor({}, 'text');
    const lighterText = useThemeColor({}, 'lighterText');

    const widthAnim = useRef(new Animated.Value(52)).current;

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: isSearching ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [isSearching]);

    return (
        <View style={styles.wrapper}>
            {!isSearching && (
                <ThemedText type="subtitle" style={{ fontSize: 24, fontWeight: 500 }}>
                    Search
                </ThemedText>
            )}

            <Animated.View style={[styles.search, { flex: widthAnim }]}>
                {isSearching && (
                    <TouchableOpacity
                        style={[styles.searchIcon, { backgroundColor: white }]}
                        onPress={() => setIsSearching(false)}
                    >
                        <HugeiconsIcon icon={Cancel01FreeIcons} color={textColor} />
                    </TouchableOpacity>
                )}
                {isSearching && (
                    <TextInput
                        style={[styles.searchInput, { backgroundColor: white, color: textColor }]}
                        placeholder="Search..."
                        placeholderTextColor={lighterText}
                    />
                )}
            </Animated.View>
            <TouchableOpacity
                style={[styles.searchIcon, { backgroundColor: white }]}
                onPress={() => setIsSearching(true)}
            >
                <HugeiconsIcon icon={Search01Icon} color={textColor} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 4,
        paddingBottom: 12,
        paddingHorizontal: 20,
    },

    search: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 52,
        columnGap: 4,
    },

    searchInput: {
        borderRadius: 100,
        height: 52,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 18,
        flex: 1,
        // Shadow cho iOS
        shadowColor: '#9e9e9eff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow cho Android
        elevation: 5,
    },

    searchIcon: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,

        // Shadow cho iOS
        shadowColor: '#9e9e9eff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow cho Android
        elevation: 5,
    },
});
export default ListHeader;
