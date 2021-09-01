import React, { Component, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import SignatureCanvas from "./signature";

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
    <SignatureCanvas
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      penColor={penColor}
      clearText={clearText}
      clearButtonColor={clearButtonColor}
      clearBorder={clearBorder}
      clearBorderColor={clearBorderColor}
      clearRounding={clearRounding}
      saveText={saveText}
      saveButtonColor={saveButtonColor}
      saveBorder={saveBorder}
      saveBorderColor={saveBorderColor}
      saveRounding={saveRounding}
      action={action}
      _height={_height}
      _width={_width}
      styles={styles}
      _setScrollEnabled={_setScrollEnabled}
    />
  );
}

export default Signature;
