import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { useColorScheme } from 'react-native';

import { storage } from '@/utils';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderCustom = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>(systemColorScheme ?? 'light');

    const toggleTheme = async () => {
        const newMode: ThemeMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        await storage.setTheme(newMode);
    };

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedMode = await storage.getTheme();
                if (storedMode === 'light' || storedMode === 'dark') {
                    setMode(storedMode);
                } else {
                    setMode(systemColorScheme ?? 'light');
                }
            } catch (error) {
                console.warn('Failed to load theme mode:', error);
            }
        };
        loadTheme();
    }, [systemColorScheme]);

    return <ThemeContext.Provider value={{ mode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeSwitcher = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useThemeSwitcher must be used within ThemeProviderCustom');
    return context;
};
