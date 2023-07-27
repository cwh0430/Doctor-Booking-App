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
let SQLite = require ('react-native-sqlite-storage');

export default class RegisterScreen extends Component {
  constructor (props) {
    super (props);

    this.state = {
      username: '',
      password: '',
      rePassword: '',
      email: '',
      users: [],
    };

    this.register = this.register.bind (this);
    this.getAllData = this.getAllData.bind (this);


    this.db = SQLite.openDatabase (
      {name: 'userdb'},
      this.openCallback,
      this.errorCallback
    );
  }

  

  componentDidMount () {
    this.getAllData ();
  }

  

  getAllData () {
    this.db.transaction (tx =>
      tx.executeSql (
        'SELECT * FROM users ORDER BY username',
        [],
        (tx, results) => this.setState ({users: results.rows.raw ()})
      )
    );
  }

  register () {
    let usernameNow = this.state.username;
    let passwordNow = this.state.password;
    let emailNow = this.state.email;
    let confPassword = this.state.rePassword;
    let allUsers = this.state.users;

    if (usernameNow === '' || passwordNow === '' || emailNow === '') {
      alert ('Please fill in all parts!');
      return;
    }
    this.db.transaction (tx => {
      const sql = `SELECT * FROM users WHERE useremail='${emailNow}' OR username='${usernameNow}'`;
      tx.executeSql (sql, [], (tx, results) => {
        const len = results.rows.length;
        if (!len) {
          if (passwordNow === confPassword) {
            this.db.transaction (tx => {
              tx.executeSql (
                'INSERT INTO users(username,useremail,password) VALUES(?,?,?)',
                [this.state.username, this.state.email, this.state.password]
              );
            });
            this.props.navigation.goBack ();
            return;
          }
          alert ('Check your Password!');
        } else {
          alert ('Email or Username Exist!');
        }
      });
    });
  }

  openDb () {
    console.log ('Database opened');
  }
  errorDb (err) {
    console.log ('SQL Error: ' + err);
  }

  render () {
    return (
      <View style={styles.boxcontainer}>
        <Text style={styles.registertext}>
          Register
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
              this.setState ({password: value.trim ()});
              console.log (this.state.password);
            }}
          />
        </View>
        <View style={styles.inputcontainer2}>
          <TextInput
            placeholder="Confirm Password"
            style={styles.inputform}
            secureTextEntry={true}
            value={this.state.rePassword}
            onChangeText={value => {
              this.setState ({rePassword: value.trim ()});
              console.log (this.state.rePassword);
            }}
          />
        </View>
        <View style={styles.inputcontainer2}>
          <TextInput
            placeholder="Enter Email"
            style={styles.inputform}
            value={this.state.email}
            onChangeText={value => {
              this.setState ({email: value.trim ()});
              console.log (this.state.email);
            }}
          />
        </View>
        <View>
          <Text style={styles.registertnc}>
            {' '}
            By Clicking Register you have accepted the terms and conditions.
          </Text>
        </View>
        <View>

          <TouchableOpacity
            style={styles.registerbtn}
            onPress={() => {
              this.register ();
            }}
          >

            <Text style={styles.btntext}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{backgroundColor: 'white', marginTop: 25}}
            onPress={() => {
              this.props.navigation.navigate ('Login');
            }}
          >

            <Text style={{fontSize: 16, paddingRight: 10, color: 'grey'}}>
              Already A Member? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/*
const RegisterScreen = ({navigation}) => {
   
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');
  const[confPassword,setConfPassword]=useState('');


 
   return (
    <View  style={styles.boxcontainer}>
    <Text style={{fontSize:20,fontWeight:'bold',marginTop:20, }}>Register</Text>
     <View style={styles.inputcontainer}>
      <TextInput placeholder='Enter Username' 
      style={styles.inputform}
      username={username}
      onChangeText={setUsername}
        
      />
    </View>
    <View style={styles.inputcontainer2}>
      <TextInput placeholder='Enter Password' 
      style={styles.inputform}
      secureTextEntry={true}
      password={password}
      onChangeText={setPassword}
     
      />
    </View>
    <View style={styles.inputcontainer2}>
      <TextInput placeholder='Confirm Password' 
      style={styles.inputform}
      secureTextEntry={true}
      confPassword={confPassword}
      onChangeText={setConfPassword}
     
      />
    </View>
    <View style={styles.inputcontainer2}>
      <TextInput placeholder='Enter Email' 
      style={styles.inputform}
      email={email}
      onChangeText={setEmail}
      
      />
    </View>
    <View>
        <Text style={{fontWeight:"light", fontSize:12, paddingRight:10, color:"grey", textAlign:'center' }}> By Clicking Register you have accepted the terms and conditions.</Text>
    </View>
    <View>
    
    <TouchableOpacity style={{backgroundColor: '#7d8ff5', paddingHorizontal:50, paddingVertical:10, borderRadius:5,marginTop:25}} 
            onPress={() => {
              console.log(username)
              console.log(password)
              console.log(confPassword)
              console.log(email)
              
            }}>
            
            
            <Text style={{fontWeight:"bold", fontSize:16, paddingRight:10, color:"white" }}>Register</Text>
          </TouchableOpacity>
    </View>
    <View>
    <TouchableOpacity style={{backgroundColor: 'white',marginTop:25}} 
            onPress={() => {
              navigation.navigate ('LoginScreen');
            }}>
            
            <Text style={{ fontSize:16, paddingRight:10, color:"grey" }}>Already A Member? Sign In</Text>
          </TouchableOpacity>
    </View>
    </View>
    
  )
}
*/

const styles = StyleSheet.create ({
  boxcontainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 80,
    width: '80%',
    marginLeft: 40,
    height: '73%',
  },
  inputform: {
    fontSize: 15,
  },
  inputcontainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 30,
    width: '80%',
    marginBottom: 5,
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
    marginBottom: 7,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    textAlign: 'left',
    padding: 2,
  },

  registertnc: {
    fontWeight: 'light',
    fontSize: 12,
    paddingRight: 10,
    color: 'grey',
    textAlign: 'center',
  },

  registertext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },

  registerbtn: {
    backgroundColor: '#7d8ff5',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 25,
  },

  btntext: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 10,
    color: 'white',
  },
});
