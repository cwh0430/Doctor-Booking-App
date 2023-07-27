import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileStackNav from './ProfileStackNav';
import CovidLatestScreen from '../screens/CovidLatestScreen';
import MainStackNav from './MainStackNav';
import BookingStackNav from './BookingStackNav';
import Ionicons from 'react-native-vector-icons/Ionicons';

const tabNav = createBottomTabNavigator ();

export default class TabNav extends Component {
  render () {
    return (
      <tabNav.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === 'Hometab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === 'Profiletab') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === 'CovidInfotab') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            }else if (rn === "Bookingtab"){
              iconName = focused ? 'eye' : 'eye-outline';
            }

            return <Ionicons name={iconName} size={size} color={'#774ced'} />;
          },
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16,
          },
        })}
      >
        <tabNav.Screen
          name="Hometab"
          component={MainStackNav}
          options={{
            tabBarShowLabel: false,
          }}
        />

        <tabNav.Screen
          name="CovidInfotab"
          component={CovidLatestScreen}
          options={{
            tabBarShowLabel: false,
          }}
        />

        <tabNav.Screen
          name="Profiletab"
          component={ProfileStackNav}
          options={{
            tabBarShowLabel: false,
          }}
        />

      </tabNav.Navigator>
    );
  }
}
