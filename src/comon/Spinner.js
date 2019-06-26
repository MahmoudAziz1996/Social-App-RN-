import React from 'react'
import { View, Text,ActivityIndicator } from 'react-native'

const Spinner = (props) => {
    return (
        <View style={styles.spinnnerStyle}>
            <ActivityIndicator size={props.size || 'large'}/>
        </View>
    )
}

const styles={
    spinnnerStyle:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    }
}

export  {Spinner}
