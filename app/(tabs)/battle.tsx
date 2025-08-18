import { useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import BattleHistory from '@/components/battle-history';
import BattleUserList from '@/components/battle-user-list';
import Leaderboard from '@/components/leader-board';

import { useThemeColor } from '@/hooks/useThemeColor';

function Battle() {
    const [activeTab, setActiveTab] = useState('leaderboard');
    const textColor = useThemeColor({}, 'text');
    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <BattleUserList />;
            case 'history':
                return <BattleHistory />;
            case 'leaderboard':
                return <Leaderboard />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.tabs}>
                {['leaderboard', 'users', 'history'].map((tab) => (
                    <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
                        <ThemedText
                            style={[styles.tabText, activeTab === tab && [styles.activeTabText, { color: textColor }]]}
                        >
                            {tab === 'leaderboard' ? 'Leaderboard' : tab === 'users' ? 'Người chơi' : 'Lịch sử'}
                        </ThemedText>
                        {activeTab === tab && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.body}>{renderContent()}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },

    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
    },
    tabButton: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 6,
    },
    tabText: {
        fontSize: 16,
        color: '#868686ff',
    },
    activeTabText: {
        fontWeight: 'bold',
    },
    tabIndicator: {
        marginTop: 4,
        height: 3,
        width: '60%',
        backgroundColor: '#156ae0ff', // màu highlight (xanh iOS)
        borderRadius: 2,
    },
});

export default Battle;
