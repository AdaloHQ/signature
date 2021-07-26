import React, { Component, useRef } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import getSignature from "./signature";

function Signature(props) {
  const {
    backgroundColor,
    penColor,
    buttonColor,
    clearText,
    saveText,
    buttonTextColor,
    borderColor,
    action,
  } = props;
  return (
    <View style={(styles.wrapper, { border: `2px solid ${borderColor}` })}>
      {getSignature(
        backgroundColor,
        penColor,
        buttonColor,
        clearText,
        saveText,
        buttonTextColor,
        borderColor,
        action
      )}
    </View>
  );
}
//
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Signature;
