import React, {Fragment} from 'react';
import { Text, TouchableOpacity } from 'react-native';

const BB = ({ onPress, children }) => {
 return (
   <TouchableOpacity 
   onPress={onPress} 
   style={styles.Buttonstyle}>
      <Text style={styles.Textstyle}>{children}</Text>
    </TouchableOpacity>
 );
};

const styles = {
  Buttonstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
   
  },
  Textstyle: {
    alignSelf: 'center',
        fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
    paddingTop: 10,
    paddingBottom: 10,

  }


};
export {BB};
