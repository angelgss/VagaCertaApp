import React, { useState, useEffect } from 'react';
import { View, Text, Button, Linking, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../../services/api';


interface RouteParams {
  id: string; 
}

// tipo da vaga
interface Vaga {
  title: string;
  description: string;
  status: string;
  phone: string;
}

const Details = () => {
  
  const route = useRoute();
  const { id } = route.params as RouteParams; 
  const [vaga, setVaga] = useState<Vaga | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); //  controlar o carregamento

  useEffect(() => {
    // Fazendo a requisição à API
    api.get(`/vagas/${id}`)
      .then((response: { data: React.SetStateAction<Vaga | null>; }) => {
        setVaga(response.data);
        setLoading(false); // Atualizando o estado após o carregamento
      })
      .catch((error: any) => {
        console.error("Erro ao carregar vaga:", error);
        setLoading(false); // Certificando-se de que o loading é desativado mesmo em caso de erro
      });
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />; // Indicador de carregamento

  if (!vaga) return <Text>Vaga não encontrada.</Text>; // Mensagem caso a vaga não seja encontrada

  const handleContact = () => {
    Linking.openURL(`https://wa.me/${vaga.phone}`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{vaga.title}</Text>
      <Text style={{ marginVertical: 10 }}>{vaga.description}</Text>
      <Text>Status: {vaga.status}</Text>
      {vaga.status === 'aberta' && (
        <Button title="Entrar em contato" onPress={handleContact} />
      )}
    </View>
  );
};

export default Details;
