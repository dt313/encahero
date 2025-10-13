import { Fragment, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedView } from './ThemedView';
import Button from './button';
import ContributionGraph from './contribution-graph';
import Statistic from './statistic';

const CHART_TABS = [
    {
        title: '🚀',
    },
    {
        title: 'Graph',
    },
    // {
    //     title: 'Bar',
    // },
];
function Charts() {
    const [activeTab, setActiveTab] = useState(CHART_TABS[0].title);

    const handleTabPress = (title: string) => {
        setActiveTab(title);
    };

    const textColor = useThemeColor({}, 'text');
    const chartBg = useThemeColor({}, 'chartBg');
    const chartHeaderBG = useThemeColor({}, 'chartHeaderBG');
    const activeTabBackground = useThemeColor({}, 'authSwitcherActiveTabBackground');

    const renderComponent = (activeTab: string) => {
        switch (activeTab) {
            case 'Graph':
                return <ContributionGraph bgColor={chartBg} />;
            case 'Bar':
                return <Fragment />;
            case '🚀':
                return <Statistic />;
        }
    };
    return (
        <ThemedView darkColor={chartBg} style={styles.wrapper}>
            {/* Tabs */}

            <ThemedView darkColor={chartBg} style={[styles.tabs, { backgroundColor: chartHeaderBG }]}>
                {CHART_TABS.map((tab) => {
                    return (
                        <Button
                            key={tab.title}
                            buttonStyle={{
                                ...styles.tab,
                                backgroundColor: activeTab === tab.title ? activeTabBackground : 'transparent',
                            }}
                            textStyle={{
                                color: textColor,
                            }}
                            onPress={() => handleTabPress(tab.title)}
                        >
                            {tab.title}
                        </Button>
                    );
                })}
            </ThemedView>

            <View style={styles.body}>{renderComponent(activeTab)}</View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginTop: 16,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#7e7c7c44',

        // Shadow iOS
        shadowColor: '#000',
        shadowOffset: { width: 12, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // Shadow Android
        elevation: 1,
    },
    tabs: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1.2,
        borderBottomColor: '#7e7c7c44',
        padding: 2,
    },
    tab: {
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'transparent',
    },

    body: {
        minHeight: 100,
    },
});
export default Charts;
