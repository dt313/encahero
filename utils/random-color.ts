const lightColors = [
    '#ffe4e1', // hồng nhạt
    '#e0f7fa', // xanh nhạt
    '#fff9c4', // vàng nhạt
    '#e1bee7', // tím nhạt
    '#dcedc8', // xanh lá nhạt
];

const darkColors = [
    '#784dadff', // tím đậm
    '#05494cff', // xanh biển đậm
    '#51370eff', // vàng đậm
    '#1b5e20', // xanh lá đậm
    '#5c1d0aff', // đỏ đậm
];

// Hàm lấy màu ngẫu nhiên từ mảng
export default function getRandomColor(theme: string | null | undefined = 'light') {
    return theme === 'light'
        ? lightColors[Math.floor(Math.random() * lightColors.length)]
        : darkColors[Math.floor(Math.random() * darkColors.length)];
}
