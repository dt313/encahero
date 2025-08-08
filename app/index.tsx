import { Redirect } from 'expo-router';

import { useSelector } from 'react-redux';

function IndexScreen() {
    const { isLoggedIn } = useSelector((state: any) => state.auth);

    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    return <Redirect href="/(tabs)" />;
}

export default IndexScreen;
