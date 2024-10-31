import { View, Text, StyleSheet, Pressable, ScrollView} from 'react-native'
import { colors } from '../../constants/colors'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Select } from '../../components/input/select'
import { router } from 'expo-router'
import { useDataStore } from '../../store/data'

const schema = z.object({
    gender: z.string().min(1, {message: "O sexo é obrigatório"}),
    objective: z.string().min(1, {message: "O objetivo é obrigatório"}),
    level: z.string().min(1, {message: "Selecione o seu nível"}),
})
type FormData = z.infer<typeof schema>

export default function Create() {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const genderOptions = [
        {label: 'Masculino', value:'Masculino'},
        {label: 'Feminino', value:'Feminino'},
    ]

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios 5 a 7 dia por semana)', value: 'Altamente ativo (exercícios 5 a 7 dia por semana)' },
      ]

      const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia e Definição' },
        { label: 'Definição', value: 'Definição' },
      ]

      const setPageTwo  = useDataStore(state => state.setPageTwo)
      function handleCreate(data:FormData){
        console.log('Passando dados da page 2')
        setPageTwo({
            gender: data.gender,
            level: data.level,
            objective: data.objective,
        })
        router.push('/nutrition')
      }

 return (
    <View style={styles.container}>
    <Header step='Passo 2' title='FInalizando dieta!'/>
    <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
        control={control}
        name="gender"
        placeholder="Selecione o seu sexo..."
        error={errors.gender?.message}
        options={genderOptions}
      />

        <Text style={styles.label}>Nível:</Text>
        <Select
        control={control}
        name="level"
        placeholder="Selecione seu nível de atividade física"
        error={errors.level?.message}
        options={levelOptions}
      />

        <Text style={styles.label}>Objetivo:</Text>
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
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background
    },
    content:{
        paddingLeft: 16,
        paddingRight: 16
    },
    label:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    button:{
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,

    },
    buttonText:{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'

    }
})