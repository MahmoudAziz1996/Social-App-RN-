import React, { Component } from 'react'
import { Text, Alert, View } from 'react-native'
import { BB, Card, CardSection, Input, Spinner } from '../comon'
import firebase from 'firebase'
import { Avatar, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import { SignUp } from '../actions/index'
class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { name: '', email: '', pass: '', error: '', loading: null, imgUri: '' }
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#007ACC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    componentWillReceiveProps (nextProps) {
        if(nextProps.signedup){
            this.props.navigation.goBack();
            // Alert.alert("Done")
        }
    }
    

    doSignUp = () => {
        const { name, email, pass, imgUri } = this.state;
        this.props.SignUp({ name, email, pass, imgUri })
    }
    renderErrorMessage = () => {
        if (this.props.error) {
            return (
                <Text style={{ color: 'red', fontSize: 16 ,textAlign:'center'}}>{this.props.error}</Text>
            )
        }

    }


   

    renderBtn = () => {
        return (
            <View style={{ flex: 1 }}>
                <Button title="Register"
                    onPress={this.doSignUp}
                    loading={this.props.loading}
                    disabled={!this.state.imgUri}
                />
            </View>
        )

    }
    SelectAvatar = () => {
        const options = {
            title: 'Select Avatar',
            quality: 0.1,
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({
                imgUri: response.uri
            })
            // console.log(response);
        })
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Avatar
                            size={100}
                            containerStyle={{ marginVertical: 8 }}
                            rounded
                            icon={{ name: 'user', type: 'font-awesome' }}
                            onPress={this.SelectAvatar}
                            source={this.state.imgUri ? { uri: this.state.imgUri } : null}
                        />
                    </View>
                </CardSection>

                <CardSection>

                    <Input

                        placeholder="Enter Name"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                        lable="Name" />

                </CardSection>

                <CardSection>

                    <Input
                        textContentType="email-address"
                        placeholder="Ali@gmail.com"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                        lable="Email" />

                </CardSection>

                <CardSection>
                    <Input

                        secureTextEntry
                        placeholder="Password"
                        value={this.state.pass}
                        onChangeText={text => this.setState({ pass: text })}
                        lable="Password" />

                </CardSection>
                {this.renderErrorMessage()}


                <CardSection>
                    {this.renderBtn()}
                </CardSection>

            </Card>

        )
    }
}

const mapSteteToProps = (state) => {
    // console.log(state.auth)
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        signedup: state.auth.signedup
    }

}

export default connect(mapSteteToProps, { SignUp })(SignUpForm)