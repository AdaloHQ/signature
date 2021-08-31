import React, { Component, useRef } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import getSignature from "./signature";

function Signature(props) {
  const { setStyles, buttons, _height, _width, _setScrollEnabled } = props;
  const {
    clearText,
    clearButtonColor,
    clearBorder,
    clearBorderColor,
    clearRounding,
    saveText,
    saveButtonColor,
    saveBorder,
    saveBorderColor,
    saveRounding,
    action,
    styles,
  } = buttons;
  let { backgroundColor, penColor, borderColor } = props;
  if (setStyles === 0) {
    backgroundColor = "#FFFFFF";
    borderColor = "#E0E0E0";
    penColor = "#666666";
  } else if (setStyles === 1) {
    backgroundColor = "#F5F5F5";
    borderColor = "#9E9E9E";
    penColor = "#666666";
  } else if (setStyles === 2) {
    backgroundColor = "#212121";
    borderColor = "#757575";
    penColor = "#FFFFFF";
  }
  return (
    <View style={styles.wrapper}>
      {getSignature(
        backgroundColor,
        borderColor,
        penColor,
        clearText,
        clearButtonColor,
        clearBorder,
        clearBorderColor,
        clearRounding,
        saveText,
        saveButtonColor,
        saveBorder,
        saveBorderColor,
        saveRounding,
        action,
        _height,
        _width,
        styles,
        _setScrollEnabled,
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
