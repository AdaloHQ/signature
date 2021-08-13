import React, { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
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
  const sigRef = useRef();
  const row = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  };
  const saveButton = {
    width: "50%",
    height: _height * 0.2,
    margin: "auto",
    float: "left",
    textAlign: "center",
    color: styles.saveButton.color,
  };
  const clearButton = {
    width: "50%",
    height: _height * 0.2,
    margin: "auto",
    float: "left",
    textAlign: "center",
    color: styles.clearButton.color,
  };
  const saveButtonText = {
    color: styles.saveButton.color,
    textAlign: "center",
    borderWidth: 2,
    backgroundColor: saveButtonColor,
    borderColor: borderColor,
  };
  const clearButtonText = {
    color: styles.clearButton.color,
    textAlign: "center",
    borderWidth: 2,
    backgroundColor: clearButtonColor,
    borderColor: borderColor,
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
          <Text style={[clearButtonText, { borderRightWidth: 0 }]}>
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
