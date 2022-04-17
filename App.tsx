import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import LogIn from "./src/pages/LogIn";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LogIn />
    </View>
  );
}
