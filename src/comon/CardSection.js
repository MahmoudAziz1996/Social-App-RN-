import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
       {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
      padding: 5,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: '#ddd',
      position: 'relative'

  }
};
export  {CardSection};
