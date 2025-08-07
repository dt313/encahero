import { useState } from 'react';

import { Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Xử lý đăng nhập tại đây
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <SafeAreaView>
            <Text>Login</Text>
        </SafeAreaView>
    );
}

export default Login;
