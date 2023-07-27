import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditPasswordScreen from '../screens/EditPasswordScreen';

const profileStack = createStackNavigator ();

export default class ProfileStackNav extends Component {
  render () {
    return (
      <profileStack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{headerShown: false}}
      >

        <profileStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{margin: 0}}
        />

        <profileStack.Screen
          name="EditPasswordScreen"
          component={EditPasswordScreen}
        />


      </profileStack.Navigator>
    );
  }
}
