import { StatusBar } from 'expo-status-bar';

import { useThemeSwitcher } from '@/context/custom-theme-provider';

function CustomStatusBar() {
    const { mode } = useThemeSwitcher();

    return <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />;
}

export default CustomStatusBar;
