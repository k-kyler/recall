import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/public/Login";
import Register from "../screens/public/Register";
import ForgotPassword from "../screens/public/ForgotPassword";
import TodoList from "../screens/private/TodoList";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#ff6e69" },
        }}
      >
        <Stack.Screen
          options={{ title: "Welcome to Recall" }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          options={{ title: "Reset password" }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{ title: "Things to do", headerLeft: () => null }}
          name="TodoList"
          component={TodoList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
