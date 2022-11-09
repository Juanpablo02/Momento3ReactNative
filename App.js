import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Touchable,
  TouchableOpacity,
  Image
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from "@expo/vector-icons";


function Vendedor({ route }) {
  return (
    <View>
      <Text>Inicio</Text>
    </View>
  );
}

function Venta({ route }) {
  return (
    <View>
      <Text>Inicioo</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Vendedor"
        component={Vendedor}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Venta"
        component={Venta}
        options={{ title: "Venta",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={20} color={color} />
        ) }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ title: "Sistema de Ventas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
