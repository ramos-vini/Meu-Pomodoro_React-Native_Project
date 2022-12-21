import { StyleSheet } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  IconButton,
} from "@react-native-material/core";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { userIsLoggedIn, authLogout, reautenticate } from "./util/auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const firebaseConfig = {
  // databaseURL: "https://meu-pomodoro-7d0fb.firebaseio.com",
  apiKey: "AIzaSyDodZ2dh2l7qBrckukpXjSHW3a41Y2qC2E",
  authDomain: "meu-pomodoro-7d0fb.firebaseapp.com",
  projectId: "meu-pomodoro-7d0fb",
  storageBucket: "meu-pomodoro-7d0fb.appspot.com",
  messagingSenderId: "32516519284",
  appId: "1:32516519284:web:6be5e2d541f16d255b2821",
  measurementId: "G-P2HEVQJ38C",
};

const firebaseApp = initializeApp(firebaseConfig);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const verifyLogin = async () => {
    if (await userIsLoggedIn() !== null) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    reautenticate(); 
    verifyLogin();
  }, [])

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let icon = "";
              switch (route.name) {
                case "Home":
                  icon = "home";
                  break;
                  s;
                case "Profile":
                  icon = "account";
                  break;
              }

              return <Icon name={icon} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
          initialRouteName="Profile"
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerRight: () => (
                <IconButton
                  icon={(props) => <Icon name="logout" {...props} />}
                  color="primary"
                  onPress={() => {
                    authLogout();
                    setIsLoggedIn(false);
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            initialParams={{
              firebaseApp,
            }}
            options={{
              title: "Perfil",
              headerRight: () => (
                <IconButton
                  icon={(props) => <Icon name="logout" {...props} />}
                  color="primary"
                  onPress={() => {
                    authLogout();
                    setIsLoggedIn(false);
                  }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            initialParams={{
              setIsLoggedIn,
              firebaseApp,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
            initialParams={{
              setIsLoggedIn,
              firebaseApp,
            }}
          />
        </Stack.Navigator>
      )}
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
