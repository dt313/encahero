import React from 'react';

import { Platform } from 'react-native';

import { Tabs } from 'expo-router';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Colors } from '@/constants/Colors';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="home" size={24} color={color} />;
                    },
                }}
            />
            <Tabs.Screen
                name="list"
                options={{
                    title: 'List',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="list-alt" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    title: 'Quiz',
                    tabBarIcon: ({ color }) => <MaterialIcons name="quiz" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="battle"
                options={{
                    title: 'Battle',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="axe-battle" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
