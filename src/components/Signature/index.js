import React, { Component, useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SignatureCanvas from './signature'

function Signature(props) {
  const {
    setStyles,
    backgroundColor,
    penColor,
    borderColor,
    buttons,
    _height,
    _width,
    _setScrollEnabled,
  } = props
  const {
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
  } = buttons

  let bgColor = backgroundColor
  let bdColor = borderColor
  let pColor = penColor

  if (setStyles === 0) {
    bgColor = '#FFFFFF'
    bdColor = '#E0E0E0'
    pColor = '#666666'
  } else if (setStyles === 1) {
    bgColor = '#F5F5F5'
    bdColor = '#9E9E9E'
    pColor = '#666666'
  } else if (setStyles === 2) {
    bgColor = '#212121'
    bdColor = '#757575'
    pColor = '#FFFFFF'
  }

  const saveButton = {
    backgroundColor: saveButtonColor,
    borderWidth: saveBorder ? 1 : 0,
    borderColor: saveBorderColor,
    borderRadius: saveRounding,
  }

  const clearButton = {
    backgroundColor: clearButtonColor,
    borderWidth: clearBorder ? 1 : 0,
    borderColor: clearBorderColor,
    borderRadius: clearRounding,
  }

  const saveButtonText = {
    fontFamily: styles.saveText.fontFamily,
    color: styles.saveText.color,
    fontWeight: styles.saveText.fontWeight,
    fontSize: 14,
  }

  const clearButtonText = {
    fontFamily: styles.clearText.fontFamily,
    color: styles.clearText.color,
    fontWeight: styles.clearText.fontWeight,
    fontSize: 14,
  }
  return (
    <SignatureCanvas
      backgroundColor={bgColor}
      borderColor={bdColor}
      penColor={pColor}
      clearText={clearText}
      saveText={saveText}
      action={action}
      styles={styles}
      containerStyles={containerStyles}
      saveButton={saveButton}
      clearButton={clearButton}
      saveButtonText={saveButtonText}
      clearButtonText={clearButtonText}
      _height={_height}
      _width={_width}
      _setScrollEnabled={_setScrollEnabled}
    />
  )
}

const containerStyles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
  },
  buttons: {
    width: '100%',
    height: 40,
    marginTop: 16,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
  },
})

export default Signature
