import React from 'react'
import {StatusBar} from 'react-native'
import Home from '../Components/Home'
import Profile from '../Components/Navigator'
import Colors from '../Components/Colors'
import { TabNavigator } from 'react-navigation';
import { AddButton, LogoutButton } from '../Components/HeaderButtons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';

console.disableYellowBox = true;
const Tabs = TabNavigator({
  
    Main: {
        screen:Home,
        navigationOptions: ({ navigation }) => ({
          title: 'Home',
          headerRight: <AddButton navigation={navigation} />,
          headerLeft: <LogoutButton navigation={navigation}/>,
          tabBarIcon: ({ tintColor }) => {
              return (
                  <FAIcon 
                      name='home'
                      size={25}
                      color={tintColor}
                  />
              );
          }
      })
        
    },
    Profile: {
        screen:Profile,
        navigationOptions: ({ navigation }) => ({
          title: 'Profile',
          headerLeft: <LogoutButton navigation={navigation} />,
          tabBarIcon: ({ tintColor }) => {
              return (
                  <MIcon
                      name='account-circle'
                      size={25}
                      color={tintColor}
                  />
              );
          }
      })
    }
  },{
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveTintColor: Colors.blue,
      activeTintColor: Colors.Primary,
      pressColor: Colors.grat,
      indicatorStyle: { height:0 },
      style: {
        backgroundColor: Colors.white
    }
    }
  }
  );

  export default Tabs;
