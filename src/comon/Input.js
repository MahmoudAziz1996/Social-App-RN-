import React from 'react'
import { Text, View, TextInput } from 'react-native'



const Input = (props) => {

    return (
        <View style={styles.containerstyle}>
            <Text style={styles.labelstyle}>{props.lable}</Text>
            <TextInput
                keyboardType={props.textContentType}
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
                autoCorrect={false}
                value={props.value}
                onChangeText={props.onChangeText}
                style={styles.inputstyle} />
        </View>
    )
}

const styles = {
    inputstyle: {
        padding: 0, margin: 0,
        color: '#000', fontSize: 18,
        lineHeight: 20,
        flex: 2,

    },
    labelstyle: {
        fontSize: 20,
        flex: 1,
        color: "#000",
        paddingLeft: 12,
    },
    containerstyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    }
}
export { Input };
