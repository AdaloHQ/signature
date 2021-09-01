import React, { useRef, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import SignaturePad from "react-signature-pad-wrapper";
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
    styles,
  } = props;
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  const row = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "stretch",
  };

  const buttons = {
    width: "100%",
    height: 40,
    textAlign: "center",
    marginTop: 16,
    padding: 10,
    borderStyle: "solid",
  };

  const saveButton = {
    backgroundColor: saveButtonColor,
    fontWeight: styles.saveText.fontWeight,
    color: styles.saveText.color,
    borderWidth: saveBorder ? 1 : 0,
    borderColor: saveBorderColor,
    borderRadius: saveRounding,
  };

  const clearButton = {
    backgroundColor: clearButtonColor,
    fontWeight: styles.clearText.fontWeight,
    color: styles.clearText.color,
    borderWidth: clearBorder ? 1 : 0,
    borderColor: clearBorderColor,
    borderRadius: clearRounding,
  };

  const saveButtonText = {
    fontFamily: styles.saveText.fontFamily,
    fontSize: 14,
  };

  const clearButtonText = {
    fontFamily: styles.clearText.fontFamily,
    fontSize: 14,
  };

  const handleConfirm = () => {
    if (!ref.current.isEmpty()) {
      if (action) {
        setLoading(true);
        const imageArgument = {
          data: ref.current.toDataURL(),
          filename: "signature.png",
        };
        action(imageArgument);
        setLoading(false);
      }
    }
  };

  const handleClear = () => {
    if (!ref.current.isEmpty()) {
      ref.current.clear();
    }
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: backgroundColor,
          border: `1px solid ${borderColor}`,
        }}
      >
        <SignaturePad ref={ref} options={{ penColor: penColor }} />
      </View>
      <View style={row}>
        <View style={{ width: "50%", paddingRight: "8px" }}>
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
        <View style={{ width: "50%", paddingLeft: "8px" }}>
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
