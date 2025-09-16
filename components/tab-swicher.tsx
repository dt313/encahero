import { memo } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedText } from './ThemedText';

export type Tab = {
    label: string;
    value: string;
};

export type TabSwitcherProps = {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (value: string) => void;
    containerStyle?: object;
    tabStyle?: object;
};
function TabSwitcher({ tabs = [], activeTab, onTabChange, containerStyle, tabStyle }: TabSwitcherProps) {
    const activeColorText = useThemeColor({}, 'authSwitcherActiveText');
    const activeTabBackground = useThemeColor({}, 'authSwitcherActiveTabBackground');

    return (
        <View style={styles.tabContainer}>
            {tabs.map((tab) => {
                return (
                    <TouchableOpacity
                        key={tab.value}
                        style={[
                            styles.tab,
                            activeTab === tab.value && { backgroundColor: activeTabBackground },
                            containerStyle,
                        ]}
                        onPress={() => onTabChange(tab.value)}
                    >
                        <ThemedText
                            darkColor="#fff"
                            lightColor="#333"
                            style={[
                                styles.tabText,
                                activeTab === tab.value && { color: activeColorText, opacity: 1 },
                                tabStyle,
                            ]}
                        >
                            {tab.label}
                        </ThemedText>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 4,
        marginBottom: 12,
        alignItems: 'center',
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },

    tabText: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.3,
        opacity: 0.7,
    },
});

export default memo(TabSwitcher);
