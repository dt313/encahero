/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000000ff';
const tintColorDark = '#fff';

export const commonColor = {
    failBgColor: '#f05b5b22',
    failBorderColor: '#f23434ff',
    trueBgColor: '#69e25922',
    trueBorderColor: '#29b83aff',
    volumeColor: '#396feeff',
    primaryColor: '#FF9800',
};

export const Colors = {
    light: {
        primary: '#FF9800',
        text: '#11181C',
        lighterText: '#6d6d6dff',
        background: '#eee',
        white: '#fff',
        black: '#333',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        shadowColor: '#333',
        overlayBg: '#333',
        mainBoxBg: '#fff',
        choiceNumberBg: '#dadada77',

        authSwitcherActiveTabBackground: '#c2c2c244',
        authSwitcherActiveText: '#1D1D1F',
        authInputBackground: '#d2d5d977',

        dividerColor: '#E5E5E7',
        chartBg: '#fff',
        chartHeaderBG: '#eee',
        goalBg: '#c4ed81ff',
        emptySquareColor: '#e2e2e277',

        // quizModeCard
        reviewTagBorderColor: '#bdc5d1',
        reviewTagColor: '#333',
        reviewTagBg: '#e7eaf388',

        newTagBorderColor: '#007AFF',
        newTagBg: '#E8F0FF',
        newTagColor: '#0051A8',

        // learning card
        learningListCardBg: '#f3f4f6',
        learningListCardActiveBg: '#eef2ff',
        learningListCardActiveTextColor: '#3730a3',
        learningListCardBorderColor: '#e5e7eb',
        learningListCardPrimaryColor: '#6366f1',

        // quiz setting
        quizLinkTextColor: '#4f46e5',
        quizLinkBg: '#eef2ff',
        reviewBg: '#E5E1DA',

        // battle header
        battleHeaderBorder: '#ddd',

        // input
        inputBorderColor: '#88888855',

        // setting
        settingBoxBg: '#fff',

        androidPickerBg: '#ddd',
        bottomModalBg: '#fff',

        // card modal
        removeButtonBg: '#f05b5b22',
    },
    dark: {
        primary: '#FF9800',
        text: '#ECEDEE',
        lighterText: '#9c9b9bff',
        background: '#222222',
        white: '#333',
        black: '#fff',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
        shadowColor: '#DEDED1',
        overlayBg: '#dadada66',
        mainBoxBg: '#151515',
        choiceNumberBg: '#9e9e9e44',

        authSwitcherActiveTabBackground: '#d9d8d844',
        authSwitcherActiveText: '#ffffffff',
        authInputBackground: '#4b4b4b77',

        dividerColor: '#747474ff',
        chartBg: '#0c1117',
        chartHeaderBG: '#131a23ff',
        goalBg: '#005B4188',
        emptySquareColor: '#e2e2e222',

        // learning card
        learningListCardBg: '#343434ff',
        learningListCardActiveBg: '#000',
        learningListCardActiveTextColor: '#fff',
        learningListCardBorderColor: '#575757ff',
        learningListCardPrimaryColor: '#6d6edcff',

        // quiz setting
        quizLinkTextColor: '#f7f7f7ff',
        quizLinkBg: '#5c5d5dff',
        reviewBg: '#3C3D37',

        // quizModeCard
        reviewTagBorderColor: '#88888855',
        reviewTagColor: '#fff',
        reviewTagBg: '#9e9e9e44',
        newTagBorderColor: '#5AA0FF',
        newTagBg: '#1A1F2E',
        newTagColor: '#AFCBFF',

        // battle
        battleHeaderBorder: '#5a5a5aff',
        // input
        inputBorderColor: '#88888855',

        settingBoxBg: '#111',

        androidPickerBg: '#333',
        bottomModalBg: '#222',

        // card modal
        removeButtonBg: '#f05b5b',
    },
};
