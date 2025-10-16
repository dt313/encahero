import React, { useEffect } from 'react';

import { AppState, Platform } from 'react-native';

import { Tabs } from 'expo-router';

import { useThemeSwitcher } from '@/context/custom-theme-provider';
import { askPermissionIfNeeded, removeNotificationPermissionKey } from '@/helper/permission';
import { updateUser } from '@/store/action/auth-action';
import { initLearningList } from '@/store/action/learning-list-action';
import { RootState } from '@/store/reducers';
import { BookOpen01Icon, Home01Icon, Quiz02Icon, Settings02Icon, Sword03Icon } from '@hugeicons/core-free-icons';
import { useQuery } from '@tanstack/react-query';
import * as RNLocalize from 'react-native-localize';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '@/constants/Colors';

import TabIconButton from '@/components/tab-icon-button';
import TabBarBackground from '@/components/ui/TabBarBackground';

import useToast from '@/hooks/useToast';

import { storage } from '@/utils';

import { collectionService, userService } from '@/services';

export default function TabLayout() {
    const { mode } = useThemeSwitcher();
    const dispatch = useDispatch();
    const { showErrorToast } = useToast();
    const { data: myCollections } = useQuery({
        queryKey: ['my-collections'],
        queryFn: collectionService.getMyLearningList,
    });
    const me = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        removeNotificationPermissionKey();

        const timeout = setTimeout(() => {
            askPermissionIfNeeded();
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (myCollections?.length) {
            dispatch(initLearningList(myCollections));
        }
    }, [myCollections, dispatch]);

    useEffect(() => {
        const checkTimeZone = async () => {
            const currentTimeZone = RNLocalize.getTimeZone();
            if (!me?.timeZone || me.timeZone !== currentTimeZone) {
                try {
                    const res = await userService.updateTimeZone(currentTimeZone);

                    if (res) {
                        await storage.setUser(res);
                        dispatch(updateUser(res));
                    }
                } catch (error) {
                    showErrorToast(error);
                }
            }
        };

        // Lần đầu mount
        checkTimeZone();

        // Mỗi lần app từ background -> foreground
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkTimeZone();
            }
        });

        return () => subscription.remove();
    }, [me?.timeZone]);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[mode ?? 'light'].tint,
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
                name="quiz/[id]"
                options={{
                    title: 'Quiz',
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
                name="setting"
                options={{
                    title: 'Setting',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIconButton icon={Settings02Icon} color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}
