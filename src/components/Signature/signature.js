import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import SignatureScreen from 'react-native-signature-canvas'
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
    _height,
    _width,
    _setScrollEnabled,
  } = props
  const sigRef = useRef()
  const [loading, setLoading] = useState(false)

  const borderFix = {
    width: '50%',
    borderColor: borderColor,
    borderTopWidth: 1,
    borderStyle: 'solid',
  }

  const handleEmpty = () => {
    console.log('Empty signature')
  }

  const handleSignature = (signature) => {
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

  const handleClear = () => {
    sigRef.current.clearSignature()
  }

  const handleConfirm = () => {
    sigRef.current.readSignature()
  }

  const onBegin = () => {
    if (_setScrollEnabled) {
      _setScrollEnabled(false)
    }
  }

  const onEnd = () => {
    if (_setScrollEnabled) {
      _setScrollEnabled(true)
    }
  }

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
          imageType={'image/svg+xml'}
          penColor={penColor}
          autoClear={false}
        />
      </View>
      <View style={containerStyles.row}>
        <View style={[borderFix, { paddingRight: 8 }]}>
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
        <View style={[borderFix, { paddingLeft: 8 }]}>
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
