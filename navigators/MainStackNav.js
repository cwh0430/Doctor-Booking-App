import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ViewDoctorScreen from '../screens/ViewDoctorScreen';
import BookingStackNav from './BookingStackNav'


const mainStack = createStackNavigator ();

export default class MainStackNav extends Component {
    render(){
        return(
            <mainStack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>

            <mainStack.Screen name="Home" component={HomeScreen} options={{margin:0}} />
  
            <mainStack.Screen name="BookingStack" component={BookingStackNav} />
  
            <mainStack.Screen name="Doctors" component={ViewDoctorScreen} />
  
          </mainStack.Navigator>
        );
    }
}