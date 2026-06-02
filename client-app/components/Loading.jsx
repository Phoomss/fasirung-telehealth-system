import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.light.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },
});