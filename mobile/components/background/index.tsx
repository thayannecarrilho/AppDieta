import React, { useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, View } from 'react-native';

interface BackgroundProps {
  children: React.ReactNode; // Adiciona a propriedade children
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moveBackground = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -600,
            duration: 30000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 30000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    moveBackground();
  }, [translateY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, { transform: [{ translateY }] }]}>
        <ImageBackground
          source={require('../../assets/images/fundo.png')}
          style={styles.backgroundImage}
        />
        <ImageBackground
          source={require('../../assets/images/fundo.png')}
          style={[styles.backgroundImage, styles.backgroundRepeat]}
          imageStyle={{ transform: [{ scaleY: -1 }] }}
        />
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // Mantém o fundo atrás
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundRepeat: {
    position: 'absolute',
    top: '100%',
  },
});

export default Background;
