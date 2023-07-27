import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TimePickerAndroid,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
let docsData = require ('../assets/data/doctorsData');
let SQLite = require ('react-native-sqlite-storage');
import Moment from 'moment';

let now = new Date ();
let tmr = new Date (now);
let max = new Date ();
tmr.setDate (tmr.getDate () + 1);
max.setDate (max.getDate () + 30);

export default class MakeBookingScreen extends Component {
  constructor (props) {
    super (props);

    this.state = {
      docID: '1',
      userID: '',
      time: '10:00 a.m',
      date: tmr,
      openPicker: false,
    };

    this.openDatePicker = this.openDatePicker.bind (this);
    this.onDateSelected = this.onDateSelected.bind (this);
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

  openDatePicker () {
    this.setState ({openPicker: true});
  }
  onDateSelected (event, value) {
    this.setState ({
      date: value,
      openPicker: false,
    });
  }

  getData () {
    try {
      AsyncStorage.getItem ('userCurrent').then (value => {
        if (value != null) {
          let user = JSON.parse (value);
          this.setState ({userID: user.userid});
        }
      });
    } catch (error) {
      console.log (error);
    }
  }

  createBookPressed () {
    let docNow = this.state.docID;
    let timeNow = this.state.time;

    this.db.transaction (tx => {
      const sql = `SELECT * FROM bookings WHERE docID='${docNow}' AND time='${timeNow}'`;
      tx.executeSql (sql, [], (tx, results) => {
        const len = results.rows.length;
        if (!len) {
          this.db.transaction (tx => {
            tx.executeSql (
              'INSERT INTO bookings(docID,userID,date,time) VALUES(?,?,?,?)',
              [
                this.state.docID,
                this.state.userID,
                Moment (this.state.date).format ('YYYY-MM-DD').toString (),
                this.state.time,
              ],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  console.log (' data inserted successfully');
                  alert ('Booking Made! Please Be On Time!');
                } else {
                  console.log ('error in inserting data');
                }
              }
            );
          });
          this.props.route.params.refresh ();
          this.props.navigation.goBack ();
          return;
        } else {
          alert ('Time Selected is Booked! Please Select Again!');
          return;
        }
      });
    });
  }

  openCallback () {
    console.log ('database open success');
  }
  errorCallback (err) {
    console.log ('Error in opening the database: ' + err);
  }
  render () {
    return (
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <View>
            <Text style={styles.bookingtitle}>
              Book Here
            </Text>
          </View>

          <View style={{margin: 10}}>
            <Text style={styles.label}>
              Date:
            </Text>
          </View>

          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={this.openDatePicker}>
              <View>
                <TextInput
                  style={styles.input}
                  value={Moment (this.state.date).format ('YYYY-MM-DD')}
                  editable={false}
                  underlineColorAndroid={'transparent'}
                />
              </View>
            </TouchableWithoutFeedback>

            {this.state.openPicker &&
              <DateTimePicker
                value={this.state.date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                is24Hour={false}
                onChange={this.onDateSelected}
                style={styles.datePicker}
                minimumDate={
                  new Date (tmr.getFullYear (), tmr.getMonth (), tmr.getDate ())
                }
                maximumDate={
                  new Date (max.getFullYear (), max.getMonth (), max.getDate ())
                }
              />}
          </View>

          <View style={{margin: 10}}>
            <Text style={styles.label}>
              Time:
            </Text>
          </View>

          <View style={styles.pickerView}>
            <Picker
              mode={'dialog'} // 'dialog' is default, try 'dropdown'
              prompt={'Select Your Time'} // Android only, available in 'dialog' mode
              selectedValue={this.state.time}
              onValueChange={(itemValue, itemIndex) =>
                this.setState ({time: itemValue})}
            >
              {docsData.times.map ((item, index) => {
                return (
                  <Picker.Item
                    label={item.value}
                    value={item.value}
                    key={item.key}
                  />
                );
              })}
            </Picker>

          </View>

          <View style={{margin: 10}}>
            <Text style={styles.label}>
              Doctor:
            </Text>
          </View>

          <View style={styles.pickerView}>
            <Picker
              mode={'dialog'} // 'dialog' is default, try 'dropdown'
              prompt={'Select Your Doctor'} // Android only, available in 'dialog' mode
              selectedValue={this.state.docID}
              onValueChange={(itemValue, itemIndex) =>
                this.setState ({docID: itemValue})}
            >
              {docsData.doctors.map ((item, index) => {
                return (
                  <Picker.Item
                    label={item.name}
                    value={item.id}
                    key={item.id}
                  />
                );
              })}
            </Picker>
          </View>

          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.createbutton}
              onPress={() => {
                this.createBookPressed ();
              }}
            >
              <Text style={styles.buttontext}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  input: {
    fontSize: 20,
    height: 48,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: '#774ced',
    backgroundColor: '#dddddd',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  pickerView: {
    borderBottomWidth: 2,
    borderColor: '#774ced',
    margin: 10,
    backgroundColor: '#dddddd',
  },

  bookingtitle: {
    fontSize: 30,
    fontFamily: 'Roboto-Bold',
    marginTop: 50,
    marginBottom: 20,
  },

  label: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    color: 'black',
  },

  buttoncontainer: {
    alignItems: 'center',
    textAlignVertical: 'center',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },

  createbutton: {
    paddingHorizontal: 130,
    paddingVertical: 15,
    marginTop: 90,
    backgroundColor: '#774ced',
    borderRadius: 10,
  },

  buttontext: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
  },
});
