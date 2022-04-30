import React from "react";
import { View, StyleSheet } from "react-native";
import { Headline } from "react-native-paper";
import { db } from "../../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

const TodoList = () => {
  const { user, signOutHandler } = useAuth();

  return (
    <View style={styles.container}>
      <Headline onPress={signOutHandler}>What's up {user.displayName}</Headline>
    </View>
  );
};

export default TodoList;
