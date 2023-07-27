import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {ArticleAppButton} from '../components/UI';
import AsyncStorage from '@react-native-async-storage/async-storage';
let SQLite = require ('react-native-sqlite-storage');

export default class HomeScreen extends Component<Props> {
  constructor (props) {
    super (props);

    this.state = {
      email: '',
      username: '',
    };

    this.getData = this.getData.bind (this);
    this.db = SQLite.openDatabase (
      {name: 'bookingsdb', createFromLocation: '~bookingsdb.sqlite'},
      this.openCallback,
      this.errorCallback
    );
  }

  componentDidMount () {
    this.getData ();
  }

  getData () {
    try {
      AsyncStorage.getItem ('userCurrent').then (value => {
        if (value != null) {
          let user = JSON.parse (value);
          this.setState ({email: user.useremail});
          this.setState ({username: user.username});
        }
      });
    } catch (error) {
      console.log (error);
    }
  }

  render () {
    return (
      <View style={styles.homeContainer}>
        <ScrollView>
          <View style={{marginTop: 50}}>
            <Text style={styles.nameDesign}>{this.state.username} 👋</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <TouchableOpacity
                style={styles.bookContainer}
                onPress={() => {
                  this.props.navigation.navigate ('BookingStack');
                }}
              >
                <Ionicons
                  name="eye"
                  color={'white'}
                  size={50}
                  style={styles.addIcon}
                />
                <Text style={styles.booktitle}>
                  Booking
                </Text>
                <Text style={styles.booksubtitle}>
                  View My Booking
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.viewContainer}
                onPress={() => {
                  this.props.navigation.navigate ('Doctors');
                }}
              >
                <Ionicons
                  name="eye"
                  color={'#774ced'}
                  size={50}
                  style={styles.viewIcon}
                />
                <Text style={styles.doctitle}>
                  Doctors
                </Text>
                <Text style={styles.docsubtitle}>
                  View Our Doctors
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View>
            <Text style={styles.articletitle}>
              Useful Health Articles
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginLeft: 0, padding: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >

              <ArticleAppButton
                title={'What makes you choose the food you eat?'}
                desc={'Have you ever thought about why you eat what you eat?'}
                onPress={() =>
                  Linking.openURL (
                    'https://www.sciencejournalforkids.org/articles/what-makes-you-choose-the-food-you-eat/'
                  )}
              />

              <ArticleAppButton
                title={'How well do masks protect against COVID-19?'}
                desc={'So are these measures effective?'}
                onPress={() =>
                  Linking.openURL (
                    'https://www.sciencejournalforkids.org/articles/how-well-do-masks-protect-against-covid-19/'
                  )}
              />

              <ArticleAppButton
                title={'How can we relax COVID-19 restrictions?'}
                desc={"COVID-19 has changed everyone's lives."}
                onPress={() =>
                  Linking.openURL (
                    'https://www.sciencejournalforkids.org/articles/how-can-we-relax-covid-19-restrictions/'
                  )}
              />

            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  booktitle: {
    position: 'absolute',
    bottom: 25,
    left: 10,
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },

  booksubtitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    textAlign: 'left',
    fontSize: 15,
    color: 'white',
  },
  doctitle: {
    position: 'absolute',
    bottom: 25,
    left: 10,
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
  },

  docsubtitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    textAlign: 'left',
    fontSize: 15,
  },

  specialtytitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 30,
  },

  articletitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 60,
  },

  nameDesign: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 10,
  },

  viewIcon: {
    marginLeft: 5,
    marginTop: 10,
  },

  addIcon: {
    marginLeft: 5,
    marginTop: 10,
  },

  viewContainer: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    padding: 0,
    marginTop: 30,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 170,
    height: 170,
    elevation: 10,
  },

  bookContainer: {
    padding: 0,
    marginTop: 30,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#774ced',
    borderRadius: 25,
    width: 170,
    height: 170,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 30,
  },

  specialtyContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f6edff',
    borderRadius: 8,
  },
});

/*
 <View style={{flexDirection: 'row', marginLeft: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.specialtyContainer}>
                <TouchableOpacity>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    🤰 Obstetrics/Gynaecology
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.specialtyContainer}>
                <TouchableOpacity>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    🔪 General Surgery
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.specialtyContainer}>
                <TouchableOpacity>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    ❤️ Cardiology
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.specialtyContainer}>
                <TouchableOpacity>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    🩺 Endocrinology
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.specialtyContainer}>
                <TouchableOpacity>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    🦴 Spine Surgery
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.specialtyContainer}>
                <TouchableOpacity>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    🍆 Urology
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

*/
