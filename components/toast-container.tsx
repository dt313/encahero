import { hideToast } from '@/store/action/toast-action';
import { RootState } from '@/store/reducers';
import ToastType from '@/types/toast-type';
import { useDispatch, useSelector } from 'react-redux';

import Toast from './toast';

function ToastContainer() {
    const { list } = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();
    const handleHide = (id: string) => {
        dispatch(hideToast(id));
    };
    return (
        <>
            {list?.length > 0 &&
                list?.map((toast: ToastType) => {
                    return (
                        <Toast
                            key={toast.id}
                            title={toast.title}
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            position={toast.position}
                            onHide={() => handleHide(toast.id)}
                        />
                    );
                })}
        </>
    );
}

export default ToastContainer;
