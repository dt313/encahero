// LobbyRoomScreen.tsx
import React, { useEffect, useState } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import vsImg from '@/assets/images/vs.png';

type Player = {
    id: string;
    name: string;
    avatar: string;
    score: number;
};

const players: Player[] = [
    {
        id: '1',
        name: 'Alice',
        avatar: 'https://i.pravatar.cc/150?img=1',
        score: 0,
    },
    {
        id: '2',
        name: 'Bob',
        avatar: 'https://i.pravatar.cc/150?img=2',
        score: 0,
    },
];

export default function LobbyRoomScreen() {
    const [countdown, setCountdown] = useState(3);
    const router = useRouter();

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            router.replace('/match/1');
        }
    }, [countdown]);

    return (
        <LinearGradient
            colors={['#232526', '#414345']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <Image source={vsImg} style={styles.vsImg} />
            <View style={styles.playersRow}>
                {players.map((p) => (
                    <View key={p.id} style={styles.playerBox}>
                        <View style={styles.avatarWrapper}>
                            <Image source={{ uri: p.avatar }} style={styles.avatar} />
                        </View>
                        <Text style={styles.name}>{p.name}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.countdownBox}>
                <Text style={styles.countdownText}>{countdown > 0 ? countdown : 'GO!'}</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    vsImg: {
        width: 200,
        height: 200,
        marginTop: -100,
    },
    playersRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 40,
    },
    playerBox: {
        alignItems: 'center',
    },
    avatarWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
        marginBottom: 12,
    },
    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#f8f8f8',
    },
    countdownBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdownText: {
        fontSize: 84,
        fontWeight: 'bold',
        color: '#ff8000ff',
    },
});
