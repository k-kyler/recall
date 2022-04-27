import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { auth } from "../../../../firebase";

const TodoList = () => {
  return (
    <View>
      <Text onPress={() => auth.signOut(auth.getAuth())}>Todolist</Text>
    </View>
  );
};

export default TodoList;
