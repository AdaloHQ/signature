import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import SignaturePad from "react-signature-pad-wrapper";
import { WebView } from "react-native-webview";

function getSignature(
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
  styles
) {
  const ref = useRef();
  const saveBorderWidth = saveBorder ? 2 : 0;
  const clearBorderWidth = clearBorder ? 2 : 0;
  const clearPadding = 8 - clearBorderWidth;
  const savePadding = 8 - saveBorderWidth;

  const row = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "stretch",
  };

  const buttonContainer = {
    width: "50%",
    paddingLeft: 8,
    paddingRight: 8,
  };

  const saveButton = {
    width: "100%",
    height: 40,
    textAlign: "center",
    marginTop: 24,
    backgroundColor: saveButtonColor,
    fontWeight: styles.saveText.fontWeight,
    color: styles.saveText.color,
    border: `${saveBorderWidth}px solid ${saveBorderColor}`,
    borderRadius: saveRounding,
    padding: savePadding,
  };

  const clearButton = {
    width: "100%",
    height: 40,
    textAlign: "center",
    marginTop: 24,
    backgroundColor: clearButtonColor,
    fontWeight: styles.clearText.fontWeight,
    color: styles.clearText.color,
    border: `${clearBorderWidth}px solid ${clearBorderColor}`,
    borderRadius: clearRounding,
    padding: clearPadding,
  };

  const saveButtonText = {
    fontFamily: styles.saveText.fontFamily,
    fontSize: 18,
  };

  const clearButtonText = {
    fontFamily: styles.clearText.fontFamily,
    fontSize: 18,
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
    <View>
      <View
        style={{
          backgroundColor: backgroundColor,
          border: `2px solid ${borderColor}`,
        }}
      >
        <SignaturePad ref={ref} options={{ penColor: penColor }} />
      </View>
      <View style={row}>
        <View style={buttonContainer}>
          <TouchableHighlight
            style={clearButton}
            onPress={handleClear}
            underlayColor="transparent"
            activeOpacity={0.4}
          >
            <Text
              style={clearButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
              adjustsFontSizeToFit="true"
            >
              {clearText}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={buttonContainer}>
          <TouchableHighlight
            style={saveButton}
            onPress={handleConfirm}
            underlayColor="transparent"
          >
            <Text
              style={saveButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
              adjustsFontSizeToFit="true"
              activeOpacity={0.4}
            >
              {saveText}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default getSignature;
