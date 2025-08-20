import { Image, StyleSheet, Text, View } from 'react-native';

import { Circle } from 'react-native-progress';

import { ThemedText } from '@/components/ThemedText';

type Player = {
    id: string;
    name: string;
    avatar: string;
    score: number;
    progress: number; // 0~1
};

type HeaderProps = {
    players: Player[];
};

export default function MatchHeader({ players }: HeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.playersContainer}>
                {/* Player 1 */}
                <View style={styles.playerCard}>
                    <View style={styles.avatarWrapper}>
                        <Circle
                            size={70}
                            progress={players[0].progress}
                            thickness={4}
                            color="#4CAF50"
                            unfilledColor="rgba(105, 105, 105,1)"
                            borderWidth={0}
                        >
                            <Image source={{ uri: players[0].avatar }} style={styles.avatar} />
                        </Circle>
                    </View>
                    <ThemedText style={styles.playerName}>{players[0].name}</ThemedText>
                    <ThemedText style={styles.playerScore}>
                        <Text style={styles.scoreNumber}>{players[0].score} </Text>
                        <Text style={styles.scoreText}>điểm</Text>
                    </ThemedText>
                </View>

                {/* VS */}

                <ThemedText style={styles.vsText}>VS</ThemedText>

                {/* Player 2 */}
                <View style={styles.playerCard}>
                    <View style={styles.avatarWrapper}>
                        <Circle
                            size={70}
                            progress={players[1].progress}
                            thickness={4}
                            color="#ec4747ff"
                            unfilledColor="rgba(105, 105, 105,1)"
                            borderWidth={0}
                        >
                            <Image source={{ uri: players[1].avatar }} style={styles.avatar} />
                        </Circle>
                    </View>
                    <ThemedText style={styles.playerName}>{players[1].name}</ThemedText>
                    <ThemedText style={styles.playerScore}>
                        <Text style={styles.scoreNumber}>{players[1].score} </Text>
                        <Text style={styles.scoreText}>điểm</Text>
                    </ThemedText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12 },
    playersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    playerCard: { alignItems: 'center', width: '40%' },
    avatarWrapper: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    avatar: {
        width: 62,
        height: 62,
        borderRadius: 31,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -31 }, { translateY: -31 }], // căn giữa tuyệt đối
    },

    playerName: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
    playerScore: { marginBottom: 12 },
    scoreNumber: { color: '#133ec0ff', fontWeight: 'bold', fontSize: 20 },
    scoreText: { fontSize: 12, fontWeight: '400', color: '#5e5e5eff' },
    vsText: {
        fontSize: 20,
        fontWeight: 'bold',
        borderColor: '#ff4d4d',
        borderWidth: 2,
        backgroundColor: '#ff4d4d33',
        color: '#ff1a1a',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        textAlign: 'center',
    },
});
