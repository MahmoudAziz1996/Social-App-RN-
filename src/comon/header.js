import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle, ViewStyle } = styles;
  return (
    <View style={ViewStyle}>
  <Text style={textStyle}>{props.headerText}</Text>
  </View>
);
};
const styles = {
  ViewStyle: {
    backgroundColor: '#FAFAFA',
      height: 50,
        justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0,
        elevation: 4,
  },
  textStyle: {
    fontSize: 25,
    color: '#000'
  }
};
export  {Header};
