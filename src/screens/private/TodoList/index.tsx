import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, SafeAreaView, FlatList } from "react-native";
import { Headline, FAB } from "react-native-paper";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { db } from "../../../../firebase";
import Task from "../../../components/private/Task";
import { useAuth } from "../../../contexts/AuthContext";

type Task = {
  id: string;
  uid: string;
  content: string;
  isFinished: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    paddingHorizontal: 20,
  },
  tasksContainer: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  banner: {
    left: 0,
    right: 0,
    height: 200,
  },
  title: {
    marginVertical: 10,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 20,
    backgroundColor: "#ff6e69",
  },
});

const TodoList = () => {
  const { user, signOutHandler } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const tasksRef = db.collection(db.getFirestore(), "tasks");
    const query = db.query(
      tasksRef,
      db.where("uid", "==", user.uid),
      db.orderBy("timestamp", "desc")
    );

    db.onSnapshot(query, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setTasks(data as any);
    });
  };

  const addTaskHandler = async () => {
    await db.addDoc(db.collection(db.getFirestore(), "tasks"), {
      uid: user.uid,
      content: "",
      isFinished: false,
      timestamp: db.serverTimestamp(),
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={require("../../../assets/banner.svg")}
          style={styles.banner}
        />
        <Headline style={styles.title} onPress={signOutHandler}>
          What's up {user.displayName}
        </Headline>
      </View>

      <SafeAreaView style={styles.tasksContainer}>
        <FlatList
          style={styles.list}
          keyExtractor={(task) => task.id}
          data={tasks}
          renderItem={({ item }) => <Task {...item} />}
        />
      </SafeAreaView>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        color="white"
        onPress={addTaskHandler}
      />
    </View>
  );
};

export default TodoList;
