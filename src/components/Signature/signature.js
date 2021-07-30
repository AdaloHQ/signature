import React, {useRef} from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
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
  const button = {
    width: "50%",
    height: _height * 0.2,
    margin: "auto",
    float: "left",
    textAlign: "center",
    color: buttonTextColor,
  };
  const buttonText = {
    color: buttonTextColor, 
    textAlign: "center",
    borderWidth: 2,
    backgroundColor: buttonColor,
    borderColor: borderColor
  }

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
        height: _height
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
        <TouchableOpacity style={button} onPress={handleClear}>
          <Text style={[buttonText, {borderRightWidth: 0}]}>{clearText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={handleConfirm}>
          <Text style={buttonText}>{saveText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default getSignature;

//TODO:
//  - Fix border
//  - Fix canvas height (currently extends below shown area (same as current?))
//  - Signatures won't display in image component on native (existing issue)