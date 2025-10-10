/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { useThemeSwitcher } from '@/context/custom-theme-provider';

import { Colors } from '@/constants/Colors';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
    const { mode } = useThemeSwitcher();
    const colorFromProps = props[mode];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[mode][colorName];
    }
}

export function useThemeColors() {
    const { mode } = useThemeSwitcher();
    return Colors[mode];
}
