import { useState } from 'react';

import { Text, View } from 'react-native';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Xử lý đăng nhập tại đây
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View>
            <Text>Login</Text>
        </View>
    );
}

export default Login;
