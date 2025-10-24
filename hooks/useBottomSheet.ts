import { useCallback, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

export function useBottomSheet() {
    const ref = useRef<BottomSheetModal>(null);

    const open = useCallback(() => {
        ref.current?.present();
    }, []);

    const close = useCallback(() => {
        ref.current?.close();
    }, []);

    return { ref, open, close };
}
