import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Background from '@/components/background';
import { colors } from '../constants/colors';

export default function Index() {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image 
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
          <Text style={styles.title}>
            Dieta<Text style={{ color: colors.lightgreen }}>.AI</Text>
          </Text>
          <Text style={styles.text}>
            Sua dieta personalizada com inteligência artificial
          </Text>
          <Link href="/step" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Gerar dieta</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.green,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    width: 240,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.green,
    width: 130,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 160,
    height: 180,
  },
});
