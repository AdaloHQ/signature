import React, { useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import SignatureScreen from 'react-native-signature-canvas'
import RNPhotoManipulator from 'react-native-photo-manipulator'
import ImageResizer from 'react-native-image-resizer'
import RNFS from 'react-native-fs'
import { WebView } from 'react-native-webview'

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
  const sigRef = useRef()
  const saveBorderWidth = saveBorder ? 1 : 0
  const clearBorderWidth = clearBorder ? 1 : 0
  const clearPadding = 8 - clearBorderWidth
  const savePadding = 8 - saveBorderWidth

  const row = {
    display: 'flex',
    flexDirection: 'row',
    width: _width,
  }

  const saveButton = {
    width: '100%',
    height: 40,
    marginTop: 16,
    backgroundColor: saveButtonColor,
    borderWidth: saveBorderWidth,
    borderStyle: 'solid',
    borderColor: saveBorderColor,
    borderRadius: saveRounding,
    padding: savePadding,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

  const clearButton = {
    width: '100%',
    height: 40,
    marginTop: 16,
    backgroundColor: clearButtonColor,
    borderWidth: clearBorderWidth,
    borderStyle: 'solid',
    borderColor: clearBorderColor,
    borderRadius: clearRounding,
    padding: clearPadding,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

  const saveButtonText = {
    fontFamily: styles.saveText.fontFamily,
    color: styles.saveText.color,
    fontWeight: styles.saveText.fontWeight,
    fontSize: 18,
  }

  const clearButtonText = {
    fontFamily: styles.clearText.fontFamily,
    color: styles.clearText.color,
    fontWeight: styles.clearText.fontWeight,
    fontSize: 18,
  }

  const handleEmpty = () => {
    console.log('Empty signature')
  }

  const handleSignature = async (signature) => {
    console.log('signature data 92', signature)
    console.log('action 92', action)
    try {
      // const resizedImage = await ImageResizer.createResizedImage(
      //   signature,
      //   _width,
      //   _height - 56,
      //   'PNG',
      //   100
      // )

      // const resizedImageRes = await RNFS.readFile(resizedImage.uri, 'base64')
      // console.log('resizedImageRes', resizedImageRes)

      const croppedImage = await RNPhotoManipulator.crop(
        signature,
        {
          x: 100,
          y: 0 + 56,
          height: _height,
          width: _width,
        },
        undefined,
        'image/png'
      )

      console.log('cropped image', croppedImage)
      const data = `data:image/png;base64,${await RNFS.readFile(
        croppedImage,
        'base64'
      )}`
      console.log('cropped image data', data)
      console.log('height', _height, 'width', _width)
      if (action) {
        const imageArgument = {
          data: signature,
          filename: 'my-signature',
        }
        action(imageArgument)
      }
    } catch (e) {
      console.error('Something went wrong', e)
    }
    // ImageResizer.createResizedImage(signature, _width, _height - 56, 'PNG', 100)
    //   .then((resizedImage) => {
    //     console.log('resized url', resizedImage.url)
    //     //TODO: use path
    //     console.log('path', resizedImage.path)
    //     if (action) {
    //       const imageArgument = { data, filename: 'my-signature' }
    //       action(imageArgument)
    //     }
    //   })
    //   .catch((err) => {
    //     console.error('something went wrong', err)
    //   })
  }

  const handleClear = () => {
    sigRef.current.clearSignature()
  }

  const handleConfirm = async () => {
    console.log('handle confirm')
    console.log('height', _height - 56, 'width', _width)
    await sigRef.current.readSignature()
  }

  console.log('render height', _height, 'width', _width)
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
          onOK={async (sig) => await handleSignature(sig)}
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
          bgHeight={_height - 56}
          bgWidth={_width}
          autoClear={true}
          imageType={'image/png'}
          penColor={penColor}
          autoClear={false}
        />
      </View>
      <View style={row}>
        <View
          style={{
            width: '50%',
            paddingRight: 8,
            borderColor: borderColor,
            borderTopWidth: 1,
            borderStyle: 'solid',
          }}
        >
          <TouchableOpacity style={clearButton} onPress={handleClear}>
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
            width: '50%',
            paddingLeft: 8,
            borderColor: borderColor,
            borderTopWidth: 1,
            borderStyle: 'solid',
          }}
        >
          <TouchableOpacity
            style={saveButton}
            onPress={async (e) => await handleConfirm(e)}
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
  )
}

export default getSignature
