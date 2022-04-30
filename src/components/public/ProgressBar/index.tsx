import React from "react";
import { StyleSheet } from "react-native";
import { ProgressBar as PaperProgressBar } from "react-native-paper";

type Props = {
  progress: number;
};

const styles = StyleSheet.create({
  progress: {
    marginHorizontal: 50,
  },
});

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return <PaperProgressBar style={styles.progress} progress={progress} />;
};

export default ProgressBar;
