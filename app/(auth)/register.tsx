import { usePathname } from 'expo-router';

import AuthScreen from '@/components/auth-screen';

function Register() {
    const pathname = usePathname();
    const rawRoute = pathname.split('/').filter(Boolean).pop();
    const routeName = rawRoute === 'register' ? 'register' : 'login';
    return <AuthScreen type={routeName} />;
}

export default Register;
