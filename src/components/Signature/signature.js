import React, { useRef, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { WebView } from "react-native-webview";

function SignatureCanvas(props) {
  const {
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
    styles,
    _setScrollEnabled,
  } = props;
  const sigRef = useRef();
  const [loading, setLoading] = useState(false);

  const row = {
    display: "flex",
    flexDirection: "row",
    width: _width,
  };

  const buttons = {
    width: "100%",
    height: 40,
    marginTop: 16,
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
  };

  const saveButton = {
    backgroundColor: saveButtonColor,
    borderWidth: saveBorder ? 1 : 0,
    borderColor: saveBorderColor,
    borderRadius: saveRounding,
  };

  const clearButton = {
    backgroundColor: clearButtonColor,
    borderWidth: clearBorder ? 1 : 0,
    borderColor: clearBorderColor,
    borderRadius: clearRounding,
  };

  const saveButtonText = {
    fontFamily: styles.saveText.fontFamily,
    color: styles.saveText.color,
    fontWeight: styles.saveText.fontWeight,
    fontSize: 14,
  };

  const clearButtonText = {
    fontFamily: styles.clearText.fontFamily,
    color: styles.clearText.color,
    fontWeight: styles.clearText.fontWeight,
    fontSize: 14,
  };

  const handleEmpty = () => {
    console.log("Empty signature");
  };

  const handleSignature = (signature) => {
    if (action) {
      setLoading(true);
      const imageArgument = {
        data: ref.current.toDataURL(),
        filename: "signature.png",
      };
      action(imageArgument);
      setLoading(false);
    }
  };

  const handleClear = () => {
    sigRef.current.clearSignature();
  };

  const handleConfirm = () => {
    sigRef.current.readSignature();
  };

  const onBegin = () => {
    if (_setScrollEnabled) {
      _setScrollEnabled(false);
    }
  };

  const onEnd = () => {
    if (_setScrollEnabled) {
      _setScrollEnabled(true);
    }
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
          onBegin={onBegin}
          onEnd={onEnd}
          webStyle={`
			      .m-signature-pad 
			      {
				      background-color: ${backgroundColor};
				    
  				    height: ${_height - 56};
              border: 1px solid ${borderColor};
              overflow: hidden;
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
            style={[buttons, clearButton]}
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
            style={[buttons, saveButton]}
            onPress={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={styles.saveText.color} />
            ) : (
              <Text
                style={saveButtonText}
                numberOfLines={1}
                ellipsizeMode="tail"
                adjustsFontSizeToFit={true}
              >
                {saveText}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default SignatureCanvas;
