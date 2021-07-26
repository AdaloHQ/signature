import React, { Component, useRef } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
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
  action
) {
  const ref = useRef();

  const row = {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  }
  
  const button= {
    width: "50%",
    height: "20%",
    margin: "auto",
    display: "block",
    float: "left",
    padding: 5,
    textAlign: "center",
    backgroundColor: buttonColor, 
    borderTop: `1px solid ${borderColor}`, 
    color: buttonTextColor
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
    <View>
      <SignaturePad
        ref={ref}
        options={{ backgroundColor: backgroundColor, penColor: penColor }}
      />
      <View style={row}>
        <TouchableOpacity style={button} onPress={handleClear}>
          <Text>{clearText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[button, {borderLeft: `1px solid ${borderColor}`}]} onPress={handleConfirm}>
          <Text>{saveText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// const myStyles = StyleSheet.create({
//   row = {
//     display: "flex",
//     flexDirection: "row",
//     width: "100%"
//   },
//   clearButton: {
//     width: "50%",
//     height: "20%",
//     margin: "auto",
//     display: "block",
//     float: "left",
//     padding: 5,
//     textAlign: "center"
//   },
//   saveButton: {
//     width: "50%",
//     height: "20%",
//     margin: "auto",
//     display: "block",
//     float: "left",
//     padding: 5,
//     textAlign: "center"
//   }
// });

export default getSignature;
//, {backgroundColor: buttonColor, borderTop: `1px solid ${borderColor}`, color: buttonTextColor}]
//, {backgroundColor: buttonColor, borderTop: `1px solid ${borderColor}`, borderLeft: `1px solid ${borderColor}`, color: buttonTextColor}]