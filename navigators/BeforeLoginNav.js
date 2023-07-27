import React, {Component,useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import CompleteNav from './CompleteNav';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const loginStack = createStackNavigator ();

const BeforeLoginNav = () => {
  const [loggedIn, setloggedIn] = useState (false);
  const [isLoading, setisLoading] = useState (false);


  getData = async () => {
    try {
      setisLoading (true);
      const data = await AsyncStorage.getItem ('loggedIn');
      console.log (data);
      setloggedIn (data);
      setisLoading (false);
    } catch (error) {
      console.log (error);
    }
  };

  useEffect (() => {
    getData ();
  }, []);

  if(isLoading) {
    return (
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <ActivityIndicator/>
         </View>
    )
   }

  return (
    <loginStack.Navigator screenOptions={{headerShown: false}}>

      {loggedIn
        ? (<>
            
            <loginStack.Screen name="AfterLogin" component={CompleteNav} />
           

          </>)
        : (<>
            <loginStack.Screen
              name="Login"
              component={LoginScreen}
              options={{margin: 0}}
            />
            
            <loginStack.Screen name="AfterLogin" component={CompleteNav} />
            <loginStack.Screen name="Register" component={RegisterScreen} />

          </>)}

         
        

    </loginStack.Navigator>
  );
};

export default BeforeLoginNav;
