import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { WebView } from "react-native-webview";
import { Button } from "@protonapp/react-native-material-ui";

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
  const saveBorderWidth = saveBorder ? 1 : 0;
  const clearBorderWidth = clearBorder ? 1 : 0;
  const clearPadding = 8 - clearBorderWidth;
  const savePadding = 8 - saveBorderWidth;

  const row = {
    display: "flex",
    flexDirection: "row",
    width: _width,
  };

  const saveButton = {
    width: "100%",
    height: 40,
    marginTop: 16,
    backgroundColor: saveButtonColor,
    borderWidth: saveBorderWidth,
    borderStyle: "solid",
    borderColor: saveBorderColor,
    borderRadius: saveRounding,
    padding: savePadding,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  const clearButton = {
    width: "100%",
    height: 40,
    marginTop: 16,
    backgroundColor: clearButtonColor,
    borderWidth: clearBorderWidth,
    borderStyle: "solid",
    borderColor: clearBorderColor,
    borderRadius: clearRounding,
    padding: clearPadding,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  const saveButtonText = {
    fontFamily: styles.saveText.fontFamily,
    color: styles.saveText.color,
    fontWeight: styles.saveText.fontWeight,
    fontSize: 18,
  };

  const clearButtonText = {
    fontFamily: styles.clearText.fontFamily,
    color: styles.clearText.color,
    fontWeight: styles.clearText.fontWeight,
    fontSize: 18,
  };

  const handleEmpty = () => {
    console.log("Empty signature");
  };

  const handleSignature = (signature) => {
    if (action) {
      const imageArgument = {data: signature, filename: 'my-signature'}
      action(imageArgument);
    }
  };

  const handleClear = () => {
    sigRef.current.clearSignature();
  };

  const handleConfirm = () => {
    sigRef.current.readSignature();
  };

  return (
    <View>
      <View
        style={{
          width: _width,
          height: _height - 56,
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
				    
  				    height: ${_height - 56};
              border: 1px solid ${borderColor};
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
          autoClear={false}
        />
      </View>
      <View style={row}>
        <View
          style={{
            width: "50%",
            paddingRight: 8,
            borderColor: borderColor,
            borderTopWidth: 1,
            borderStyle: "solid",
          }}
        >
          <TouchableOpacity
            style={clearButton}
            onPress={handleClear}
          >
            <Text
              style={clearButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
              adjustsFontSizeToFit={true}
            >
              {clearText}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "50%",
            paddingLeft: 8,
            borderColor: borderColor,
            borderTopWidth: 1,
            borderStyle: "solid",
          }}
        >
          <TouchableOpacity
            style={saveButton}
            onPress={handleConfirm}
          >
            <Text
              style={saveButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
              adjustsFontSizeToFit={true}
              activeOpacity={0}
            >
              {saveText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default getSignature;
