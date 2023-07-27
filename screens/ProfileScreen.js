import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileAppButton} from '../components/UI';

export default class ProfileScreen extends Component {
  constructor (props) {
    super (props);

    this.state = {
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
          this.setState ({username: user.username});
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
      <View style={styles.profilecontainer}>
        <View>
          <Image
            source={require ('../assets/img/robotprofile.jpg')}
            style={styles.img}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text style={styles.label}>
            {this.state.username}
          </Text>
        </View>

        <View>
          <ProfileAppButton
            firsticon="lock-closed-outline"
            label="Change Password"
            onPress={() => {
              this.props.navigation.navigate ('EditPasswordScreen');
            }}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  img: {
    height: 120,
    width: 120,
    borderRadius: 80,
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: 60,
  },

  profilecontainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  label: {
    fontFamily: 'Roboto-Medium',
    color: 'black',
    marginBottom: 70,
  },
});
