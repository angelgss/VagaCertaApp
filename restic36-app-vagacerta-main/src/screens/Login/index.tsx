import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext'; // Importando o contexto

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Usando o contexto para login
    const navigation = useNavigation();

    const handleLogin = () => {
        // Aqui você deve validar com a API
        if (email && password) {
            login({
                email,
                id: 0
            }); // Armazenar dados no contexto
            navigation.navigate('Auth'); // Navegar para a tela de autenticação após login
        }
    };

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Digite seu e-mail"
            />
            <Text>Senha</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                placeholder="Digite sua senha"
            />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
});

export default Login;
