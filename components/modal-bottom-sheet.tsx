import React, { ReactNode, useCallback, useMemo } from 'react';

import { StyleSheet } from 'react-native';

import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { useThemeColor } from '@/hooks/useThemeColor';

type ModalBottomSheetProps = {
    bottomSheetModalRef: any;
    children: ReactNode;
    snapPoints?: string[] | number[];
};

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
    return (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
            pressBehavior="close"
            style={[props.style, { backgroundColor: '#a8b5ebbb' }]}
        />
    );
};

function ModalBottomSheet({ bottomSheetModalRef, snapPoints = ['50%'], children }: ModalBottomSheetProps) {
    const background = useThemeColor({}, 'background');
    const text = useThemeColor({}, 'text');
    const _snapPoints = useMemo(() => snapPoints, []);

    const renderBackdrop = useCallback((props: any) => {
        return <CustomBackdrop {...props} />;
    }, []);
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            // onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            snapPoints={_snapPoints}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: background }}
            handleIndicatorStyle={{ backgroundColor: text }}
        >
            <BottomSheetView style={[styles.bottomModal]}>{children}</BottomSheetView>
        </BottomSheetModal>
    );
}

const styles = StyleSheet.create({
    bottomModal: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ModalBottomSheet;
