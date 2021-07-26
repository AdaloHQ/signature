import React, { Component, useRef } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { WebView } from "react-native-webview";

function getSignature(
  backgroundColor,
  penColor,
  buttonColor,
  clearText,
  saveText,
  buttonTextColor,
  borderColor,
  action
) {
  const ref = useRef();
  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;
  const row = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  };

  const handleSignature = (signature) => {
    onOK(signature)
    if(action){
      action(signature)
    }
    ref.current.clearSignature()
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  return (
    <View>
      <SignatureScreen
        ref={ref}
        backgroundColor={backgroundColor}
        penColor={penColor}
        onOK={handleSignature}
        webStyle={style}
      />
      <View style={row}>
        <Button color={buttonColor} title={clearText} onPress={handleClear} />
        <Button color={buttonColor} title={saveText} onPress={handleConfirm} />
      </View>
    </View>
  );
}

export default getSignature;
