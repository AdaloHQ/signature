import React, { Component, useRef } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
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
  action,
  _height,
  _width
) {
  const sigRef = useRef();
  const row = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  };
  // const button = {
  //   width: "50%",
  //   height: "20%",
  //   margin: "auto",
  //   display: "block",
  //   float: "left",
  //   padding: 5,
  //   textAlign: "center",
  //   backgroundColor: buttonColor,
  //   borderTop: `1px solid ${borderColor}`,
  //   color: buttonTextColor,
  // };

  const handleEmpty = () => {
    console.log("Empty");
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
    console.log("end");
    sigRef.current.readSignature();
  };


  return (
    <View
      style={{
        width: _width,
        height: _height,
        border: `3px solid ${borderColor}`,
      }}
    >
      <SignatureScreen
        ref={sigRef}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        descriptionText=""
        clearText={clearText}
        confirmText={saveText}
        webStyle={`
			.m-signature-pad 
			{
				background-color: ${backgroundColor};
				width: ${_width};
  				height: ${_height};
			}
            .m-signature-pad--footer
            {
				display: none; margin: 0px;
            }
		`}
        autoClear={true}
        imageType={"image/svg+xml"}
        penColor={penColor}
      />
      <View style={row}>
        <Button
          color={buttonColor}
          title={clearText}
          onPress={handleClear}
        />
        <Button
          color={buttonColor}
          title={saveText}
          onPress={handleConfirm}
        />
      </View>
    </View>
  );
}

export default getSignature;
