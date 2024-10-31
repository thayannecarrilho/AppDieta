import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import  { useDataStore } from '../../store/data'
import { api } from '../../services/api'
import { useQuery } from '@tanstack/react-query'
import { colors } from '../../constants/colors'
import { Data } from '../../types/data'
import { Link } from 'expo-router'

interface ResponseData{
  data: Data
}

export default function Nutrition(){
  const user = useDataStore(state => state.user)

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async() => {
      try{
        if(!user){
          throw new Error("Filed load nutrition")
        }

        const response = await api.get<ResponseData>("/teste")        
        // const response = await api.post("/create", {
        //   name: user.name,
        //   weight: user.weight,
        //   height: user.height, 
        //   age: user.age,
        //   gender: user.gender,
        //   objective: user.objective,
        //   level: user.level,
        // })

        return response.data.data

      }catch(err){
        console.log(err)
      }
    }
  })

  if(isFetching){
    return(
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Gerando Dieta</Text>
      </View>
    )
  }

  if(error){
    return(
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
        <Link href={'/step'}>
        <Text style={styles.loadingText}>Tente Novamente</Text>
        </Link>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha Dieta</Text>
          <Pressable style={styles.buttonShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loading:{
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingText:{
    fontSize: 18, 
    color: colors.white,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container:{
    backgroundColor: colors.background,
    flex: 1,
  },

})
