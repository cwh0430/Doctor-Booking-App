import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import ViewBookingScreen from '../screens/ViewBookingScreen';
import ViewBookingDetailScreen from '../screens/ViewBookingDetailScreen';
import UpdateBookingScreen from '../screens/UpdateBookingScreen';
import MakeBookingScreen from '../screens/MakeBookingScreen';

const bookingStack = createStackNavigator ();

export default class BookingStackNav extends Component {
  render () {
    return (
      <bookingStack.Navigator
        initialRouteName="ViewBookingScreen"
        screenOptions={{headerShown: false}}
      >

        <bookingStack.Screen
          name="ViewBookingScreen"
          component={ViewBookingScreen}
          options={{margin: 0}}
        />

        <bookingStack.Screen
          name="ViewBookingDetailScreen"
          component={ViewBookingDetailScreen}
        />

        <bookingStack.Screen
          name="UpdateBookingScreen"
          component={UpdateBookingScreen}
        />

        <bookingStack.Screen
          name="MakeBookingScreen"
          component={MakeBookingScreen}
        />

      </bookingStack.Navigator>
    );
  }
}
