import React, { ReactNode, useCallback, useMemo } from 'react';

import { StyleSheet, View } from 'react-native';

import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { useThemeColor } from '@/hooks/useThemeColor';

type ModalBottomSheetProps = {
    bottomSheetModalRef: any;
    children: ReactNode;
    snapPoints?: string[] | number[];
};

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
    const overlayBg = useThemeColor({}, 'overlayBg');
    return (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={1}
            pressBehavior="close"
            style={[props.style, { backgroundColor: overlayBg }]}
        />
    );
};

function ModalBottomSheet({ bottomSheetModalRef, snapPoints = [], children }: ModalBottomSheetProps) {
    const bottomModalBg = useThemeColor({}, 'bottomModalBg');

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
            backgroundStyle={{ backgroundColor: bottomModalBg }}
            handleIndicatorStyle={{ backgroundColor: text }}
        >
            <BottomSheetView style={[styles.bottomModal]}>
                <View style={{ minHeight: '100%', width: '100%', paddingBottom: 32 }}>{children}</View>
            </BottomSheetView>
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
