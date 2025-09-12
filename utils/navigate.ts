import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: object) {
    console.log(navigationRef.isReady());
    if (navigationRef.isReady()) {
        console.log('navigate');
        navigationRef.navigate(params !== undefined ? ({ name: name as never, params } as never) : (name as never));
    }
}
