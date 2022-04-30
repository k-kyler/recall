import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox } from "react-native-paper";
import { db } from "../../../../firebase";
import TextInput from "../../public/TextInput";

type Props = {
  id: string;
  content: string;
  isFinished: boolean;
};

const styles = StyleSheet.create({
  task: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    backgroundColor: "transparent",
    marginTop: 7,
  },
  strikeContent: {
    backgroundColor: "transparent",
    marginTop: 7,
    textDecorationLine: "line-through",
    color: "#a4a9af",
  },
});

const Task: React.FC<Props> = ({ id, content, isFinished }) => {
  const [checked, setChecked] = useState(isFinished);
  const [value, setValue] = useState(content);

  const checkedHandler = () => {
    const taskRef = db.doc(db.getFirestore(), "tasks", id);

    db.updateDoc(taskRef, {
      isFinished: !checked,
    }).then(() => setChecked(!checked));
  };

  const changeContentHandler = () => {};

  const removeTaskHandler = () => {};

  return (
    <View style={styles.task}>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={checkedHandler}
      />
      <TextInput
        style={checked ? styles.strikeContent : styles.content}
        value={value}
        onChange={changeContentHandler}
        disabled={checked}
        dense
        mode="outlined"
        underlineColor="transparent"
        activeUnderlineColor="transparent"
        outlineColor="transparent"
        activeOutlineColor="transparent"
      />
    </View>
  );
};

export default Task;
