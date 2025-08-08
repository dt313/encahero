import { Redirect } from 'expo-router';

import { RootState } from '@/store/reducers';
import { useSelector } from 'react-redux';

function IndexScreen() {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    return <Redirect href="/(tabs)" />;
}

export default IndexScreen;
