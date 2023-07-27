import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TimePickerAndroid,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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

export default class UpdateBookingScreen extends Component {
  constructor (props) {
    super (props);

    this.state = {
      bookingID: this.props.route.params.id,
      docID: '',
      time: '',
      date: new Date (),
      openPicker: false,
      isLoading: false,
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

  getData = async () => {
    this.setState ({isLoading: true});
    await this.db.transaction (async tx => {
      tx.executeSql (
        'SELECT * FROM bookings WHERE bookID = ?',
        [this.state.bookingID],
        (tx, results) => {
          if (results.rows.length) {
            this.setState ({
              date: new Date (results.rows.item (0).date),
              time: results.rows.item (0).time,
              docID: results.rows.item (0).docID,
            });
          }
          this.setState ({isLoading: false});
        }
      );
    });
  };

  updateBookPressed () {
    this.db.transaction (tx => {
      tx.executeSql (
        'UPDATE bookings SET date=?,time=?,docID=? WHERE bookID=?',
        [
          Moment (this.state.date).format ('YYYY-MM-DD'),
          this.state.time,
          this.state.docID,
          this.state.bookingID,
        ]
      );
    });
    this.props.route.params.refresh ();
    this.props.route.params.listRefresh ();
    this.props.navigation.goBack ();
  }

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

    return (
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <View>
            <Text style={styles.updatetitle}>
              Update Here
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
              style={styles.button}
              onPress={() => {
                this.updateBookPressed ();
              }}
            >
              <Text style={styles.buttontext}>
                Update Now
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

  updatetitle: {
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

  button: {
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
