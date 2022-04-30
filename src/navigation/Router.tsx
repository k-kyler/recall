import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/public/Login";
import Register from "../screens/public/Register";
import ForgotPassword from "../screens/public/ForgotPassword";
import TodoList from "../screens/private/TodoList";
import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

const Router = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#ff6e69" },
        }}
      >
        {user ? (
          <Stack.Screen
            options={{ header: () => null, title: "Things to do" }}
            name="TodoList"
            component={TodoList}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
