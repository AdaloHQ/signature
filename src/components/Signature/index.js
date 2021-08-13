import React, { Component, useRef } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import getSignature from "./signature";

function Signature(props) {
  const { setStyles, primaryColor, action, _height, _width, styles } = props;
  let {
    backgroundColor,
    penColor,
    saveButtonColor,
    clearButtonColor,
    borderColor,
  } = props;
  let buttonTextColor;
  if (setStyles === 0) {
    backgroundColor = "#FFFFFF";
    penColor = "#666666";
    saveButtonColor = primaryColor;
    clearButtonColor = primaryColor;
    borderColor = "#E0E0E0";
  } else if (setStyles === 1) {
    backgroundColor = "#F5F5F5";
    penColor = "#666666";
    saveButtonColor = "#34C759";
    clearButtonColor = "#9E9E9E";
    borderColor = "#9E9E9E";
  } else if (setStyles === 2) {
    backgroundColor = "#212121";
    penColor = "#FFFFFF";
    saveButtonColor = "#757575";
    clearButtonColor = "#757575";
    borderColor = "#212121";
  }
  console.log(styles.clearText);
  return (
    <View style={(styles.wrapper, { border: `2px solid ${borderColor}` })}>
      {getSignature(
        backgroundColor,
        penColor,
        saveButtonColor,
        clearButtonColor,
        props.clearText,
        props.saveText,
        borderColor,
        action,
        _height,
        _width,
        styles
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Signature;
