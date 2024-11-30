import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
    const { user, logout } = useAuth();
    const [email, setEmail] = useState(user.email);

    const handleSave = () => {
        api.put(`/users/${user.id}`, { email }).then(() => {
            alert('Dados atualizados com sucesso!');
        });
    };

    return (
        <View>
            <Text>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Button title="Salvar" onPress={handleSave} />
            <Button title="Sair" onPress={logout} />
        </View>
    );
};

export default Profile;
