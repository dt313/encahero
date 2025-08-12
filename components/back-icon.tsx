import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import Button, { ButtonProps } from './button';

function BackIcon(props: ButtonProps) {
    const textColor = useThemeColor({}, 'text');
    return (
        <Button
            buttonStyle={{
                backgroundColor: 'transparent',
                width: 40,
                height: 40,
                padding: 4,
                paddingHorizontal: 0,
                paddingVertical: 0,
                borderWidth: 1,
                borderColor: textColor,
                borderRadius: 50,
                zIndex: 1,
            }}
            {...props}
        >
            <HugeiconsIcon icon={ArrowLeft01Icon} color={textColor} size={24} />
        </Button>
    );
}

export default BackIcon;
