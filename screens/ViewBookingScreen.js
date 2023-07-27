import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
let docsData = require ('../assets/data/doctorsData');
let SQLite = require ('react-native-sqlite-storage');

export default class ViewBookingScreen extends Component {
  constructor (props) {
    super (props);

    this.state = {
      userID: '',
      haveBooking: true,
      isLoading: false,
      bookings: [],
    };

    this.getData = this.getData.bind (this);

    this.db = SQLite.openDatabase (
      {name: 'bookingsdb'},
      this.openCallback,
      this.errorCallback
    );
  }

  componentDidMount () {
    this.getData ();
  }

  getData = async () => {
    try {
      this.setState ({isLoading: true});
      await AsyncStorage.getItem ('userCurrent').then (value => {
        if (value != null) {
          let user = JSON.parse (value);

          this.setState ({userID: user.userid});
        }
      });
    } catch (error) {
      console.log (error);
    }

    let userNow = this.state.userID;

    this.db.transaction (tx => {
      const sql = `SELECT * FROM bookings WHERE userID='${userNow}'`;
      tx.executeSql (sql, [], (tx, results) => {
        const len = results.rows.length;

        if (len) {
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push (results.rows.item (i));
          }

          this.setState ({bookings: temp});
          this.setState ({haveBooking: true});

          console.log (this.state.bookings);
        } else {
          this.setState ({haveBooking: false});
        }

        this.setState ({isLoading: false});
      });
    });
  };

  renderBookingItem = ({item}) => {
    return (
      <View style={styles.BookingContainer}>
        {/* Booking Top Section */}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate ('ViewBookingDetailScreen', {
              id: item.bookID,
              refresh: this.getData,
            });
          }}
        >
          {/* Booking Middle Section */}
          <View style={styles.bookingMiddleWrapper}>
            <View style={styles.bookingDoctorItemsWrapper}>

              <View style={styles.bookingDoctorItemsTextWrapper}>
                <Text style={styles.bookingDoctorItemName}>
                  {docsData.getArray (docsData.doctors, item.docID).name}
                </Text>

              </View>
            </View>
          </View>

          {/* Booking Bottom Section */}
          <View style={styles.bookingBottomWrapper}>
            <View style={styles.bookingLeftItemsWrapper}>
              <Text style={styles.bookingLeftItemText}>Date</Text>
              <Text style={styles.bookingLeftItemText}>Time</Text>
            </View>
            <View style={styles.bookingRightItemsWrapper}>
              <Text style={styles.bookingRightItemText}>{item.date}</Text>
              <Text style={styles.bookingRightItemText}>{item.time}</Text>
            </View>
          </View>

        </TouchableOpacity>

      </View>
    );
  };

  openCallback () {
    console.log ('database open success');
  }
  errorCallback (err) {
    console.log ('Error in opening the database: ' + err);
  }

  render () {
    if (this.state.isLoading === true) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }

    if (this.state.haveBooking === false) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"white"}}>

          <View>
            <Text style={{textAlign:"center", fontSize:30, fontFamily:"Roboto-Medium", color:"black"}}>You Have no booking!</Text>
          </View>

          <View>
            <TouchableOpacity
              style={{width: 300, height: 50, backgroundColor:"#774ced", marginTop:20, borderRadius:10, textAlignVertical:"center"}}
              onPress={() => {
                this.props.navigation.navigate ('MakeBookingScreen', {
                  refresh: this.getData,
                });
              }}
            >
              <Text style={{textAlign:"center", fontSize:20, fontFamily:"Roboto-Medium", color:"white"}}>Make Booking</Text>
            </TouchableOpacity>

          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* Background Styling */}

        <View style={styles.topContainer} />
        <View style={styles.bottomContainer} />

        {/* Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Your Booking</Text>
        </View>

        {/* Current Booking */}
        <View style={styles.BookingWrapper}>
          <View style={styles.BookingListWrapper}>
            <FlatList
              data={this.state.bookings}
              renderItem={this.renderBookingItem}
              keyExtractor={item => item.bookID}
              vertical={true}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: '#9573f2',
    height: '40%',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  titleWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 22,
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 40,
    letterSpacing: 2,
    padding: 10,
    color: '#f2f2f2',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 3,
      height: 4,
    },
    textShadowOpacity: 0.9,
    textShadowRadius: 10,
  },
  BookingWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
    top: '15%',
    marginBottom: 400,
  },
  BookingListWrapper: {
    paddingBottom: 20,
    marginBottom: 120,
  },
  BookingContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 25,
    paddingTop: 20,
    shadowColor: 'grey',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 30,
    marginBottom: 50,
    borderRadius: 30,
  },
  bookingTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookingItemBookingID: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 18,
    color: '#ff4d4d',
    letterSpacing: 0.5,
    paddingTop: 10,
    paddingBottom: 5,
    textShadowColor: '#ff9999',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowOpacity: 0.9,
    textShadowRadius: 10,
  },
  updateIcon: {
    marginRight: -7,
  },
  bookingMiddleWrapper: {
    marginTop: 22,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 2,
  },
  bookingDoctorItemsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginBottom: 45,
  },
  bookingDoctorItemsImageWrapper: {
    alignSelf: 'center',
    marginRight: 25,
    backgroundColor: '#f2f2f2',
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 15,
  },
  bookingDoctorItemImage: {
    width: 85,
    height: 85,
    borderRadius: 15,
    backgroundColor: '#cab9f8',
  },
  bookingDoctorItemsTextWrapper: {
    marginTop: 15,
    marginRight: 100,
  },
  bookingDoctorItemName: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 16,
    color: '#774ced',
    letterSpacing: 0.7,
    lineHeight: 20,
    paddingBottom: 5,
    textShadowColor: '#bfbfbf',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowOpacity: 0.9,
    textShadowRadius: 10,
  },
  bookingDoctorItemSpecialty: {
    fontFamily: 'Rubik-Medium',
    fontSize: 14,
    letterSpacing: 0.7,
    lineHeight: 25,
    color: '#808080',
    paddingBottom: 5,
    textShadowColor: '#cccccc',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowOpacity: 0.9,
    textShadowRadius: 10,
  },
  bookingBottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 10,
  },
  bookingLeftItemsWrapper: {
    alignItems: 'flex-start',
    marginLeft: 2,
  },
  bookingLeftItemText: {
    fontFamily: 'Rubik-Middle',
    fontSize: 17,
    letterSpacing: 1,
    lineHeight: 40,
    color: '#666666',
    paddingBottom: 5,
    textShadowColor: '#bfbfbf',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowOpacity: 0.9,
    textShadowRadius: 10,
  },
  bookingRightItemsWrapper: {
    alignItems: 'flex-end',
    marginRight: 2,
  },
  bookingRightItemText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 16,
    letterSpacing: 0.8,
    lineHeight: 40,
    color: '#666666',
    paddingBottom: 5,
    textShadowColor: '#bfbfbf',
    textShadowOffset: {
      width: 2,
      height: 3,
    },
    textShadowOpacity: 0.9,
    textShadowRadius: 10,
  },
  cancelButtonWrapper: {
    marginVertical: 10,
    marginHorizontal: '20%',
    backgroundColor: '#9573f2',
    borderRadius: 40,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 17,
    color: 'white',
    letterSpacing: 1,
  },
});
