import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  ImageBackground,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class CustomDrawer extends Component<Props> {



  logout () {
    try {
      AsyncStorage.setItem('loggedIn', "");
       AsyncStorage.setItem('userCurrent', "");

       console.log(loggedIn)
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    this.props.navigation.navigate ('BeforeLogin');
    return;
  }


  render () {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...this.props}
          contentContainerStyle={{backgroundColor: '#8200d6'}}
        >
          <ImageBackground
            source={require ('../assets/img/profile_bg2.jpg')}
            style={{padding: 20}}
          >
            <Image
              source={require ('../assets/img/robotprofile.jpg')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
            <Text
              style={{color: '#fff', fontSize: 18, fontFamily: 'Roboto-Medium'}}
            >
              {this.props.username}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Roboto-Regular',
                marginTop: 5,
              }}
            >
              🟢 Online
            </Text>
          </ImageBackground>

          <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
            <DrawerItemList {...this.props} />
          </View>
        </DrawerContentScrollView>
        <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
          <TouchableOpacity onPress={() => {this.logout()}} style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={22} color={"black"} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 5,
                  color:"black",
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



