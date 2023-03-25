import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import KnockPage from "./pages/KnockPage"
import BoringScene from "./pages/BoringScene"
import SignPage from "./pages/SignPage"

import { useContext, useEffect, useState } from "react"

import { AuthContext, AuthProvider } from "./context/AuthContext"
import { Pressable, Text, View } from "react-native"
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TabRoot() {
  return (
    <Tab.Navigator initialRouteName="KnockPage">
      <Tab.Screen name="MyNeighbors" component={KnockPage} />
      <Tab.Screen name="BoringScene" component={BoringScene} />
    </Tab.Navigator>
  )
}

function HeaderLeft() {
  const { user, logout } = useContext(AuthContext)
  return (
    <View>
      <Pressable onPress={logout}>
        <Text> {user.displayName || "Annoymous"}</Text>
      </Pressable>
    </View>
  )
}

function HomePage() {
  const { isAuthenticated, login, loginAnonymously, logout } =
    useContext(AuthContext)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="TabRoot"
            component={TabRoot}
            options={{
              headerLeft: HeaderLeft,
            }}
          />
        ) : (
          <Stack.Screen name="Sign" component={SignPage} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  // all Provider should be placed here
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  )
}
