import React, { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SignaturePad from "react-signature-pad-wrapper";
import { WebView } from "react-native-webview";

function getSignature(
  backgroundColor,
  penColor,
  buttonColor,
  clearText,
  saveText,
  buttonTextColor,
  borderColor,
  action,
  _height,
  _width
) {
  const ref = useRef();

  const row = {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  }
  
  const button = {
    width: "50%",
    height: "20%",
    margin: 0,
    display: "block",
    float: "left",
    textAlign: "center"
  }

  const buttonText = {
    backgroundColor: buttonColor,
    borderTop: `2px solid ${borderColor}`,
    color: buttonTextColor,
    width: "100%",
    display: "block",
    margin: 0,
    padding: 5
  }

  const handleConfirm = () => {
      if(!ref.current.isEmpty()){
        if(action){
          action(ref.current.toDataURL())
        }
        ref.current.clear()
      }
  }
  const handleClear = () => {
    if(!ref.current.isEmpty()) {
      ref.current.clear()
    }
  }
  ref.penColor = penColor
  ref.backgroundColor = backgroundColor
  return (
    <View style={{backgroundColor: backgroundColor}}>
      <SignaturePad
        ref={ref}
        options={{ penColor: penColor }}
      />
      <View style={row}>
        <TouchableOpacity style={button} onPress={handleClear}>
          <Text style={buttonText}>{clearText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={handleConfirm}>
          <Text style={[buttonText, {borderLeft: `2px solid ${borderColor}`}]}>{saveText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default getSignature;

//TODO
//  - Make sure entire canvas is captured/displayed when it's large
//  - Signatures from web will have black background in native webview (existing issue)