import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
let SQLite = require ('react-native-sqlite-storage');

export default class EditPasswordScreen extends Component {
  constructor (props) {
    super (props);

    this.state = {
      password: '',
      passwordOld: '',
      passwordNew: '',
      checkPasswordNew: '',
      id: '',
    };

    this.getData = this.getData.bind (this);

    this.db = SQLite.openDatabase (
      {name: 'userdb'},
      this.openCallback,
      this.errorCallback
    );
  }

  componentDidMount () {
    this.getData ();
  }

  changePressed () {
    const passwordNow = this.state.password;
    const oldPassword = this.state.passwordOld;
    const newPassword = this.state.passwordNew;
    const newPassCheck = this.state.checkPasswordNew;

    if (oldPassword == '' || newPassword == '' || newPassCheck == '') {
      alert ('Please Fill In All Inputs!');
      return;
    }
    if (passwordNow === oldPassword) {
      if (newPassword === newPassCheck) {
        Alert.alert ('Are You Sure?', 'Changing Your Password', [
          {
            text: 'No',
            onPress: () => {},
          },
          {
            text: 'Yes',
            onPress: () => {
              this.db.transaction (tx => {
                tx.executeSql ('UPDATE users SET password=? WHERE userid=?', [
                  this.state.passwordNew,
                  this.state.id,
                ]);
              });
              this.props.navigation.goBack ();
            },
          },
        ]);
      } else {
        alert ('Please Check Your New Password!');
        return;
      }
    } else {
      alert ('Please Check Your Old Password!');
      return;
    }
  }

  getData () {
    try {
      AsyncStorage.getItem ('userCurrent').then (value => {
        if (value != null) {
          let user = JSON.parse (value);
          this.setState ({password: user.password});
          this.setState ({id: user.userid});
        }
      });
    } catch (error) {
      console.log (error);
    }
  }

  render () {
    return (
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Enter Old Password"
            style={styles.inputform}
            value={this.state.passwordOld}
            onChangeText={value => {
              this.setState ({passwordOld: value.trim ()});
              console.log (this.state.passwordOld);
            }}
          />
        </View>

        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Enter New Password"
            style={styles.inputform}
            value={this.state.passwordNew}
            onChangeText={value => {
              this.setState ({passwordNew: value.trim ()});
              console.log (this.state.passwordNew);
            }}
          />
        </View>

        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Enter New Password Again"
            style={styles.inputform}
            value={this.state.checkPasswordNew}
            onChangeText={value => {
              this.setState ({checkPasswordNew: value.trim ()});
              console.log (this.state.passwordNew);
            }}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.changePressed ();
            }}
          >

            <Text style={styles.btntext}>
              Change
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create ({
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

  button: {
    paddingHorizontal: 130,
    paddingVertical: 15,
    marginTop: 90,
    backgroundColor: '#774ced',
    borderRadius: 10,
  },

  btntext: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 10,
    color: 'white',
    textAlign: 'center',
  },
});
