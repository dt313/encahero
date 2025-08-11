/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000000ff';
const tintColorDark = '#fff';

export const Colors = {
    light: {
        text: '#11181C',
        lighterText: '#6d6d6dff',
        background: '#fff',
        white: '#fff',
        black: '#333',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,

        authSwitcherActiveTabBackground: '#c2c2c244',
        authSwitcherActiveText: '#1D1D1F',
        authInputBackground: '#d2d5d977',

        dividerColor: '#E5E5E7',
        chartBg: '#fff',
        chartHeaderBG: '#ffffffff',
        goalBg: '#c4ed81ff',
    },
    dark: {
        text: '#ECEDEE',
        lighterText: '#9c9b9bff',
        background: '#151718',
        white: '#333',
        black: '#fff',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,

        authSwitcherActiveTabBackground: '#d9d8d844',
        authSwitcherActiveText: '#ffffffff',
        authInputBackground: '#4b4b4b77',

        dividerColor: '#747474ff',
        chartBg: '#0c1117',
        chartHeaderBG: '#131a23ff',
        goalBg: '#1b530cff',
    },
};
