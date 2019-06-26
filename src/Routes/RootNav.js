import { StackNavigator } from 'react-navigation'
import Login from '../Components/LoginForm'
import SignUp from '../Components/SignUpForm'
import AddPost from '../Components/AddPost'
import Colors from '../Components/Colors'
import Tabs from './Tabs'

const Navigator = StackNavigator({
    Home:{
        screen: Tabs 
    },login: {
        screen:Login,
        navigationOptions:
        {
            title: 'Login'
        }
    },
    signUp: {
        screen: SignUp ,
        navigationOptions:
        {
            title: 'Register'
        }
    },
    Add:{
        screen: AddPost ,
        navigationOptions:
        {
            title: 'Add Post'
        }
    }
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: Colors.Primary
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
            color: Colors.white,
            fontSize: 20
        }
    }
});


export default Navigator;
