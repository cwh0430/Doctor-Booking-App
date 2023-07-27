import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Button,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {
  CurrentRenderContext,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
let SQLite = require ('react-native-sqlite-storage');

export default class LoginScreen extends Component<Props> {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
      users: [],
    };

    this.db = SQLite.openDatabase (
      {name: 'userdb', createFromLocation: '~usersdb.sqlite'},
      this.openCallback,
      this.errorCallback
    );
  }

  loginPressed = async () => {
    let usernameNow = this.state.username;
    let passwordNow = this.state.password;
    if (usernameNow === '' || passwordNow === '') {
      alert ('Username or Password Cannot Be Empty!');
      return;
    }
    await this.db.transaction (async tx => {
      const sql = `SELECT * FROM users WHERE username='${usernameNow}'`;
      await tx.executeSql (sql, [], (tx, results) => {
        const len = results.rows.length;
        if (!len) {
          alert ('Invalid Username or Password!');
        } else {
          const userNow = results.rows.item (0);
          if (passwordNow === userNow.password) {
            this.setState ({users: userNow});
            try {
              AsyncStorage.setItem ('loggedIn', JSON.stringify (true));
              AsyncStorage.setItem (
                'userCurrent',
                JSON.stringify (this.state.users)
              );
            } catch (error) {
              // Error saving data
              console.log (error);
            }
            this.props.navigation.navigate ('AfterLogin');
            return;
          }
          alert ('Invalid Username or Password!');
        }
      });
    });
  };

  openCallback () {
    console.log ('database open success');
  }
  errorCallback (err) {
    console.log ('Error in opening the database: ' + err);
  }

  render () {
    console.log (this.state.users);

    return (
      <View style={styles.boxcontainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>
          Login
        </Text>
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Enter Username"
            style={styles.inputform}
            value={this.state.username}
            onChangeText={value => {
              this.setState ({username: value.trim ()});
              console.log (this.state.username);
            }}
          />
        </View>
        <View style={styles.inputcontainer2}>
          <TextInput
            placeholder="Enter Password"
            style={styles.inputform}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={value => {
              this.setState ({password:value.trim()});
              console.log (this.state.password);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.loginbutton}
          onPress={() => {
            this.loginPressed ();
          }}
        >

          <Text
            style={styles.logintext}
          >
            Submit
          </Text>
        </TouchableOpacity>
        <View />
        <View>
          <TouchableOpacity
            style={{backgroundColor: 'white', marginTop: 25}}
            onPress={() => {
              this.props.navigation.navigate ('Register');
            }}
          >

            <Text style={{fontSize: 16, paddingRight: 10, color: 'grey'}}>
              Not A Member? Click Here
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  boxcontainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 80,
    width: '80%',
    marginLeft: 40,
    height: '60%',
  },
  inputform: {
    fontSize: 15,
  },
  inputcontainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 30,
    width: '80%',
    marginBottom: 10,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    textAlign: 'left',
    padding: 2,
  },
  inputcontainer2: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
    width: '80%',
    marginBottom: 20,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    textAlign: 'left',
    padding: 2,
  },

  loginbutton:{
    backgroundColor: '#7d8ff5',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 25,
  },

  logintext:{
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 10,
    color: 'white',
  },


});

