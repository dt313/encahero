type ToastType = {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    duration: number;
    position: 'top' | 'bottom';
    visible: boolean;
};

export default ToastType;
