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
//  - Fix canvas height (currently extends below shown area (same as current signature component?))