import React, {Component} from 'react'
import { Text, Alert, StatusBar, View } from 'react-native'
import {  Card, CardSection, Input } from '../comon'
import { Button } from 'react-native-elements'
import Colors from './Colors'
import { login } from '../actions/index'
import { connect } from 'react-redux';

 class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = { email: '', pass: '' }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
        this.props.navigation.navigate('Home');
    }
}

  onBtnPress = () => {
    const { email, pass } = this.state;

    this.props.login({ email, pass });

  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      pass: '',
      loading: false,
      error: ''
    })
  }

  onLoginFail = () => {
    this.setState({
      error: 'Authentication Faild',
      loading: false,

    })
  }

 renderErrorMessage = () => {
    if (this.props.error) {
      return (<Text style={{ color: 'red',textAlign:'center', fontSize: 16 }}>{this.props.error}</Text>)
    }

  }

  render() {
    return (

      <Card>
        <StatusBar backgroundColor="#0063A6" barStyle="light-content" />
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
          <View style={{ flex: 1 }}>
            {/* {this.renderBtn()} */}
            <View>
              <Button title='Login'
               backgroundColor={Colors.Secondary}
                onPress={this.onBtnPress}
                 buttonStyle={{ padding: 10 }} 
                 loading={this.props.loading} />


              <Button title='No Account? Sign Up'
               onPress={() => this.props.navigation.navigate('signUp')} 
               buttonStyle={{ padding: 10, marginTop: 10, backgroundColor: Colors.SignUpbg }} 
               disabled={this.props.loading}/>
            </View>
          </View>
        </CardSection>



      </Card>

    )
  }
}


const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      profile: state.auth.profile,
  };
};

export default connect(mapStateToProps,{login})(LoginForm)