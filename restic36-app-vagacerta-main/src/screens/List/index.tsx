import React, { useState, useEffect } from 'react';
import { Image, FlatList, View, Text } from 'react-native';
import { Wrapper, Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import VagaCard from '../../components/VagaCard';
import api from '../../../services/api';


interface Vaga {
  id: number;
  titulo: string;
  data_cadastro: string;
  empresa: string;
}

export default function List() {
  // Tipando o estado de vagas como um array de objetos do tipo Vaga
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await api.get('/vagas');
        setVagas(response.data); //os dados da API devem estar no formato esperado
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVagas();
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <Text>Carregando vagas...</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Image source={BGTop} style={{ maxHeight: 86 }} />
      <Container>
        <Logo />
        <TextVagas>{vagas.length} vaga(s) encontrada(s)!</TextVagas>
        <ListContainer>
          <FlatList
            data={vagas}
            keyExtractor={(item) => item.id.toString()} // Usando id como chave única
            renderItem={({ item }) => (
              <VagaCard
                id={item.id}
                title={item.titulo} // Corrigindo a propriedade conforme a interface
                dataCreated={item.data_cadastro} // Corrigindo a propriedade
                company={item.empresa} // Corrigindo a propriedade 
              />
            )}
          />
        </ListContainer>
      </Container>
    </Wrapper>
  );
}
