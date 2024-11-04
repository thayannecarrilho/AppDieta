import React from 'react';
import { View, Image, Text, StyleSheet, Pressable, ScrollView, Share } from 'react-native';
import { useDataStore } from '../../store/data';
import { api } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '../../constants/colors';
import { Data } from '../../types/data';
import { Link, router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons'
import Background from '../../components/background';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore(state => state.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      if (!user) {
        throw new Error("Failed to load nutrition");
      }

      const response = await api.post<ResponseData>("/create", {
        name: user.name,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        objective: user.objective,
        level: user.level,
      });

      return response.data.data;
    }
  });

  async function handleShare() {
    try {;
      if (data && Object.keys(data).length === 0) return;

      const supplements = data?.suplementos.join(', ');
      const foods = data?.refeicoes.map(item => (
        `\n- Refeição: ${item.nome}\n- Horário: ${item.horario}\n- Alimentos: ${item.alimentos.join(', ')}`
      )).join('');

      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica Suplemento: ${supplements}`;

      await Share.share({ message });
    } catch (err) {
      console.error("Error sharing:", err);
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  }

  if (isFetching) {
    return (
      <Background>
        <View style={styles.loading}>
          <Image 
            style={styles.load}
            source={require('../../assets/images/loading.gif')}
          />
          <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
          <Text style={styles.loadingText}>Consultando IA...</Text>
        </View>
      </Background>
    );
  }
  
  if (error) {
    return (
      <Background>
        <View style={styles.loading}>
          <Image 
            style={styles.load}
            source={require('../../assets/images/erro.png')}
          />
          <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
          <Link href="/">
            <Text style={styles.loadingError}>Tente novamente</Text>
          </Link>
        </View>
      </Background>
    );
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.contentHeader}>
            <Text style={styles.title}>Minha dieta</Text>
            <Pressable style={styles.buttonShare} onPress={handleShare}>
              <Text style={styles.buttonShareText}>Compartilhar <Octicons name="share-android" size={16} color="#000" /></Text>
            </Pressable>
          </View>
        </View>

        <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
          {data && Object.keys(data).length > 0 && (
            <>
              
              
              <ScrollView>
              
                <View style={styles.foods}>
                <View style={styles.foodHeader}>
                <Text style={styles.foodName}><Ionicons name="person" size={16} color="#000" /> {data.nome}</Text>
                <Text style={styles.foodName}><AntDesign name="pushpin" size={16} color="#000" /> {data.objetivo}</Text>
                
                
                </View>
                
                  {data.refeicoes.map(refeicao => (
                    <View key={refeicao.nome} style={styles.food}>
                      <View style={styles.foodHeader}>
                        <Text style={styles.foodName}>{refeicao.nome}</Text>
                        <Ionicons name="restaurant" size={16} color="#000" />
                      </View>

                      <View style={styles.foodContent}>
                        <Feather name="clock" size={14} color="#000" />
                        <Text>Horário: {refeicao.horario}</Text>
                      </View>

                      <Text style={styles.foodText}>Alimentos:</Text>
                      {refeicao.alimentos.map(alimento => (
                        <Text key={alimento}>{alimento}</Text>
                      ))}
                    </View>
                  ))}
                </View>

                <View style={styles.supplements}>
                  <Text style={styles.foodName}>Dica suplementos:</Text>
                  {data.suplementos.map(item => (
                    <Text key={item}>{item}</Text>
                  ))}
                </View>

                <Pressable style={styles.button} onPress={() => router.replace("/")}>
                  <Text style={styles.buttonText}>Gerar nova dieta</Text>
                </Pressable>
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  loadingText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
  },
  containerHeader: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    fontSize: 28,
    color: colors.background,
    fontWeight: 'bold'
  },
  buttonShare: {
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 4
  },
  buttonShareText: {
    color: colors.black,
    fontWeight: '500'
  },
  foods: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  food: {
    backgroundColor: 'rgba(208, 208, 208, 0.40)',
    padding: 8,
    borderRadius: 4,
  },
  foodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  foodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  foodText: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },
  supplements: {
    backgroundColor: colors.white,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
    borderRadius: 8
  },
  button: {
    backgroundColor: colors.green,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold'
  },
  load: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  loadingError: {
    color: colors.green,
    fontWeight: 'bold',
    fontSize: 18
  }
});
