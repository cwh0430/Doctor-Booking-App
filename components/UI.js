import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ArticleAppButton extends Component<Props> {
  render () {
    return (
      <View style={styles.articleContainer}>
        <TouchableOpacity
          style={styles.articleBox}
          onPress={this.props.onPress}
        >
          <Text style={styles.titleStyle}>{this.props.title}</Text>
          <Text style={styles.descStyle}>{this.props.desc}</Text>
          <Ionicons
            name="arrow-forward"
            color={'white'}
            size={40}
            style={styles.arrowStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

class PrintCovidResult extends Component {
  constructor (props) {
    super (props);

    if (props.theme) {
      switch (props.theme) {
        case 'active':
          this.backgroundColor = '#4287f5'; // blue
          break;
        case 'death':
          this.backgroundColor = '#f5ad42'; // yellow
          break;
        case 'total_confirmed':
          this.backgroundColor = '#ff694f'; //red
          break;
        case 'total_death':
          this.backgroundColor = '#c663ff'; // purple
          break;
      }
    }
  }
  render () {
    return (
      <View>

        <View
          style={[
            styles.covidContainer,
            {backgroundColor: this.backgroundColor},
          ]}
        >
          <Ionicons
            name={this.props.name}
            size={40}
            color={'#fff'}
            style={styles.covidIcon}
          />
          <Text style={styles.covidNum}>{this.props.number}</Text>
          <Text style={styles.covidTitle}>{this.props.title}</Text>

        </View>

      </View>
    );
  }
}

class ProfileAppButton extends Component<Props> {
  render () {
    return (
      <View style={styles.profileAppContainer}>
        <TouchableOpacity
          style={styles.profileButtons}
          onPress={this.props.onPress}
        >
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name={this.props.firsticon}
              color={'#774ced'}
              size={25}
              style={{marginLeft: 20}}
            />
            <Text style={styles.profileLabel}>
              {this.props.label}
            </Text>

            <Ionicons
              name="chevron-forward-outline"
              color={'#774ced'}
              size={25}
              style={{position:"absolute", right:5}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  articleBox: {
    width: 300,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#7d8ff5',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 20,
  },

  titleStyle: {
    width: 270,
    top: 5,
    left: 10,
    textAlign: 'right',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },

  descStyle: {
    position: 'absolute',
    top: 5,
    left: 10,
    textAlign: 'left',
    fontSize: 15,
    color: 'white',
    marginTop: 100,
    marginRight: 5,
  },

  arrowStyle: {
    position: 'absolute',
    borderRadius: 8,
    marginTop: 140,
    marginBottom: 0,
    marginRight: 0,
    backgroundColor: 'orange',
    alignSelf: 'flex-end',
    padding: 9,
  },

  articleContainer: {
    borderRadius: 10,
    margin: 10,
    marginBottom: 80,
  },

  covidContainer: {
    width: 180,
    height: 220,
    padding: 10,
    borderRadius: 25,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },

  covidIcon: {
    marginTop: 10,
    marginBottom: 10,
  },

  covidNum: {
    fontSize: 38,
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    marginTop: 55,
    textAlign: 'right',
  },

  covidTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    marginTop: 0,
    textAlign: 'right',
  },

  profileAppContainer:{
    margin: 10, 
    alignItems: 'center'
  },

  profileButtons:{
    width: 320,
    height: 50,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    justifyContent: 'center',
  },

  profileLabel:{
    fontSize: 20, 
    color: 'black', 
    marginLeft: 20
  },

   

});

module.exports = {
  ArticleAppButton: ArticleAppButton,
  PrintCovidResult: PrintCovidResult,
  ProfileAppButton: ProfileAppButton,
};
