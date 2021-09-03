import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import SignaturePad from 'react-signature-pad-wrapper'
import { WebView } from 'react-native-webview'

function SignatureCanvas(props) {
  const {
    backgroundColor,
    borderColor,
    penColor,
    clearText,
    saveText,
    action,
    styles,
    containerStyles,
    saveButton,
    clearButton,
    saveButtonText,
    clearButtonText,
  } = props
  const ref = useRef()
  const [loading, setLoading] = useState(false)

  const handleConfirm = () => {
    if (!ref.current.isEmpty()) {
      if (action) {
        setLoading(true)
        const imageArgument = {
          data: ref.current.toDataURL(),
          filename: 'signature.png',
        }
        action(imageArgument)
        setLoading(false)
      }
    }
  }

  const handleClear = () => {
    if (!ref.current.isEmpty()) {
      ref.current.clear()
    }
  }

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
      <View style={containerStyles.row}>
        <View style={{ width: '50%', paddingRight: '8px' }}>
          <TouchableOpacity
            style={[containerStyles.buttons, clearButton]}
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
        <View style={{ width: '50%', paddingLeft: '8px' }}>
          <TouchableOpacity
            style={[containerStyles.buttons, saveButton]}
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
  )
}

export default SignatureCanvas
