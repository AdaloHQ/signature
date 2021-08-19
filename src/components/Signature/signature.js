import React, { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
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
  const sigRef = useRef();
  const saveBorderWidth = saveBorder ? 2 : 0;
  const clearBorderWidth = clearBorder ? 2 : 0;

  const row = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  };

  const saveButton = {
    width: "50%",
    height: _height * 0.2,
    margin: "auto",
    paddingTop: 24,
    paddingLeft: 8,
    paddingRight: 8,
    float: "left",
    textAlign: "center",
    color: styles.saveText.color,
  };

  const clearButton = {
    width: "50%",
    height: _height * 0.2,
    margin: "auto",
    paddingLeft: 8,
    paddingRight: 8,
    float: "left",
    textAlign: "center",
    color: styles.clearText.color,
  };

  const saveButtonText = {
    fontFamily: styles.saveText.fontFamily,
    fontWeight: styles.saveText.fontWeight,
    color: styles.saveText.color,
    textAlign: "center",
    backgroundColor: saveButtonColor,
    border: `${saveBorderWidth}px solid ${saveBorderColor}`,
  };

  const clearButtonText = {
    fontFamily: styles.clearText.fontFamily,
    fontWeight: styles.clearText.fontWeight,
    color: styles.clearText.color,
    textAlign: "center",
    backgroundColor: clearButtonColor,
    border: `${clearBorderWidth}px solid ${clearBorderColor}`,
  };

  const handleEmpty = () => {
    console.log("Empty signature");
  };

  const handleSignature = (signature) => {
    if (action) {
      action(signature);
    }
  };

  const handleClear = () => {
    sigRef.current.clearSignature();
  };

  const handleConfirm = () => {
    sigRef.current.readSignature();
  };

  return (
    <View
      style={{
        width: _width,
        height: _height,
      }}
    >
      <SignatureScreen
        ref={sigRef}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        webStyle={`
			    .m-signature-pad 
			    {
				    background-color: ${backgroundColor};
				    
  				  height: ${_height};
            border: 2px solid ${borderColor};
			    }
          .m-signature-pad--footer
          {
				    display: none;
            margin: 0px;
          }
		    `}
        autoClear={true}
        imageType={"image/svg+xml"}
        penColor={penColor}
      />

      <View style={row}>
        <TouchableOpacity style={clearButton} onPress={handleClear}>
          <Text style={clearButtonText}>
            {clearText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={saveButton} onPress={handleConfirm}>
          <Text style={saveButtonText}>{saveText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default getSignature;
