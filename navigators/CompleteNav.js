import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import MakeBookingScreen from '../screens/MakeBookingScreen';
import TabNav from './TabNav';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BeforeLoginNav from './BeforeLoginNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

const drawerNav = createDrawerNavigator ();

export default class CompleteNav extends Component {
  constructor (props) {
    super (props);

    this.state = {
      email: '',
      username: '',
    };

    this.getData = this.getData.bind (this);
  }

  componentDidMount () {
    this.getData ();
  }

  getData () {
    try {
      AsyncStorage.getItem ('userCurrent').then (value => {
        if (value != null) {
          let user = JSON.parse (value);
          this.setState ({email: user.email});
          this.setState ({username: user.username});
        }
      });
    } catch (error) {
      console.log (error);
    }
  }

  render () {
    return (
      <drawerNav.Navigator
        drawerContent={props => (
          <CustomDrawer {...props} username={this.state.username} />
        )}
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: {
            marginLeft: -20,
            fontFamily: 'Roboto-Medium',
            fontSize: 15,
          },
          drawerActiveBackgroundColor: '#774ced',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: 'black',
        }}
      >
        <drawerNav.Screen
          name="HomeDrawer"
          component={TabNav}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
            title: 'Home',
          }}
        />

        <drawerNav.Screen
          name="BeforeLogin"
          component={BeforeLoginNav}
          options={{
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
      </drawerNav.Navigator>
    );
  }
}
