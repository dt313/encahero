import { SafeAreaView } from 'react-native-safe-area-context';

import Leaderboard from '@/components/leader-board';

function Battle() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Leaderboard />
        </SafeAreaView>
    );
}

export default Battle;
