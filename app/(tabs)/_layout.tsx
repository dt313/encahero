import React from 'react';

import { Platform } from 'react-native';

import { Tabs } from 'expo-router';

import { BookOpen01Icon, Home01Icon, Quiz02Icon, Sword03Icon, UserIcon } from '@hugeicons/core-free-icons';

import { Colors } from '@/constants/Colors';

import TabIconButton from '@/components/tab-icon-button';
import TabBarBackground from '@/components/ui/TabBarBackground';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                // tabBarButton: HapticTab,
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
                    tabBarIcon: ({ color, focused }) => {
                        return <TabIconButton icon={Home01Icon} color={color} focused={focused} />;
                    },
                }}
            />
            <Tabs.Screen
                name="list"
                options={{
                    title: 'List',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIconButton icon={BookOpen01Icon} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIconButton icon={Quiz02Icon} color={color} focused={focused} />
                    ),
                    // tabBarButton: (props) => <CustomMiddleButton {...props} />,
                    // tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen
                name="battle"
                options={{
                    title: 'Battle',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIconButton icon={Sword03Icon} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIconButton icon={UserIcon} color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}
