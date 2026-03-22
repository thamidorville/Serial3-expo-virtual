import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{ tabBarActiveTintColor: '#9B59B6' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Temas',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome
                name="picture-o"
                size={size}
                color={color} />
            )
          }}
        />
        <Tabs.Screen
          name="exposicaoAR"
          options={{
            title: 'Exposição AR',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome
                name="cube"
                size={size}
                color={color} />
            )
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
