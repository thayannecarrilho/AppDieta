import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { colors } from '../../constants/colors';
import { Header } from '@/components/header';
import { Select } from '../../components/input/select';
import { useDataStore } from '../../store/data';
import { router } from 'expo-router';
import Background from '@/components/background';

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório" }),
  objective: z.string().min(1, { message: "O Objetivo é obrigatório" }),
  level: z.string().min(1, { message: "Selecione seu level" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageTwo = useDataStore(state => state.setPageTwo);

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ];

  const levelOptions = [
    { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
    { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
    { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
    { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
  ];

  const objectiveOptions = [
    { label: 'Emagrecer', value: 'emagrecer' },
    { label: 'Hipertrofia', value: 'Hipertrofia' },
    { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
    { label: 'Definição', value: 'Definição' },
  ];

  function handleCreate(data: FormData) {
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective,
    });

    router.push("/nutrition");
  }

  return (
    <Background>
      <View style={styles.container}>
        <Header step='Passo 2' title='Finalizando dieta' />
        <ScrollView style={styles.content}>
          <Text style={styles.label}>Sexo:</Text>
          <Select
            control={control}
            name="gender"
            placeholder="Selecione o seu sexo..."
            error={errors.gender?.message}
            options={genderOptions}
          />

          <Text style={styles.label}>Selecione nível de atividade física:</Text>
          <Select
            control={control}
            name="level"
            placeholder="Selecione o nível de atividade física"
            error={errors.level?.message}
            options={levelOptions}
          />

          <Text style={styles.label}>Selecione seu objetivo:</Text>
          <Select
            control={control}
            name="objective"
            placeholder="Selecione seu objetivo"
            error={errors.objective?.message}
            options={objectiveOptions}
          />

          <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
            <Text style={styles.buttonText}>Avançar</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    top: 180,
    width: '100%',
    position: 'absolute',
    paddingLeft: 25,
    paddingRight: 25,
  },
  button: {
    backgroundColor: colors.green,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
