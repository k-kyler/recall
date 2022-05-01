import React, { useState } from "react";
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Button, Checkbox } from "react-native-paper";
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
    justifyContent: "space-between",
    flexDirection: "row",
  },
  taskInner: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    backgroundColor: "transparent",
    marginTop: 7,
  },
  strikeContent: {
    textDecorationLine: "line-through",
    color: "#a4a9af",
  },
  removeButton: {},
});

const Task: React.FC<Props> = ({ id, content, isFinished }) => {
  const [checked, setChecked] = useState(isFinished);
  const [value, setValue] = useState(content);
  const [displayRemove, setDisplayRemove] = useState(false);

  const checkedHandler = () => {
    const taskRef = db.doc(db.getFirestore(), "tasks", id);

    db.updateDoc(taskRef, {
      isFinished: !checked,
    }).then(() => setChecked(!checked));
  };

  const changeContentHandler = async (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const input = e?.target as unknown as {
      value: string;
    };
    const taskRef = db.doc(db.getFirestore(), "tasks", id);

    setValue(input?.value);
    await db.updateDoc(taskRef, {
      content: input?.value,
    });
  };

  const removeTaskHandler = async () => {
    const taskRef = db.doc(db.getFirestore(), "tasks", id);

    await db.deleteDoc(taskRef);
  };

  return (
    <View style={styles.task}>
      <View style={styles.taskInner}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={checkedHandler}
        />
        <TextInput
          style={[checked && styles.strikeContent, styles.content]}
          value={value}
          onChange={changeContentHandler}
          onFocus={() => setDisplayRemove(true)}
          onBlur={() => {
            setTimeout(() => setDisplayRemove(false), 500);
          }}
          disabled={checked}
          autoFocus
          dense
          multiline
          mode="outlined"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          outlineColor="transparent"
          activeOutlineColor="transparent"
        />
      </View>
      {displayRemove && (
        <Button
          style={styles.removeButton}
          compact
          color="#ff6e69"
          icon="delete"
          onPress={removeTaskHandler}
        >
          <></>
        </Button>
      )}
    </View>
  );
};

export default Task;
