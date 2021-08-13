import React, { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SignaturePad from "react-signature-pad-wrapper";
import { WebView } from "react-native-webview";

function getSignature(
  backgroundColor,
  penColor,
  saveButtonColor,
  clearButtonColor,
  clearText,
  saveText,
  borderColor,
  action,
  _height,
  _width,
  styles
) {
  const ref = useRef();

  const row = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "stretch",
  };

  const button = {
    width: "50%",
    height: "100%",
    margin: 0,
    display: "block",
    flex: 1,
    float: "left",
    alignItems: "stretch",
    textAlign: "center",
  };

  const saveButtonText = {
    backgroundColor: saveButtonColor,
    fontFamily: styles.saveText.fontFamily,
    fontWeight: styles.saveText.fontWeight,
    color: styles.saveText.color,
    fontSize: 18,
    numberOfLines: 1,
    width: "100%",
    height: "100%",
    display: "block",
    borderTop: `2px solid ${borderColor}`,
    margin: 0,
    padding: 5,
  };

  const clearButtonText = {
    backgroundColor: clearButtonColor,
    fontFamily: styles.clearText.fontFamily,
    fontWeight: styles.clearText.fontWeight,
    color: styles.clearText.color,
    fontSize: 18,
    numberOfLines: 1,
    width: "100%",
    height: "100%",
    display: "block",
    borderTop: `2px solid ${borderColor}`,
    margin: 0,
    padding: 5,
  };

  const handleConfirm = () => {
    if (!ref.current.isEmpty()) {
      if (action) {
        action(ref.current.toDataURL());
      }
      ref.current.clear();
    }
  };
  const handleClear = () => {
    if (!ref.current.isEmpty()) {
      ref.current.clear();
    }
  };
  ref.penColor = penColor;
  ref.backgroundColor = backgroundColor;
  return (
    <View style={{ backgroundColor: backgroundColor }}>
      <SignaturePad ref={ref} options={{ penColor: penColor }} />
      <View style={row}>
        <TouchableOpacity style={button} onPress={handleClear}>
          <Text
            style={[
              clearButtonText,
              { borderRight: `2px solid ${borderColor}` },
            ]}
          >
            {clearText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={handleConfirm}>
          <Text style={saveButtonText}>{saveText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default getSignature;
