import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
let docsData = require ('../assets/data/doctorsData');

export default class ViewDoctorScreen extends Component {

  renderDoctorsItem = ({item}) => {
    return (
      <View style={styles.doctorsItemWrapper}>
        <View style={styles.doctorsItemImageWrapper}>
          <Image source={item.image} style={styles.doctorsItemImage} />
        </View>
        <View style={styles.doctorsItemTextWrapper}>
          <Text style={styles.doctorItemName}>{item.name}</Text>
          <Text style={styles.doctorItemSpecialty}>{item.specialty}</Text>
          <Text style={styles.doctorItemQualification}>
            {item.qualification}
          </Text>
          <Text style={styles.doctorItemClinicNo}>{item.clinicNo}</Text>
          <Text style={styles.doctorItemClinicContact}>
            {item.clinicContact}
          </Text>
          <Text style={styles.doctorItemLanguage}>{item.language}</Text>
          <Text style={styles.doctorItemGender}>{item.gender}</Text>
        </View>
      </View>
    );
  };

  render () {
    return (
      <View style={styles.container}>
        {/* Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Our Doctors</Text>
        </View>

        {/* Doctors */}

        <View style={styles.doctorsWrapper}>
          <View style={styles.doctorsListWrapper}>
            <FlatList
              data={docsData.doctors}
              renderItem={this.renderDoctorsItem}
              keyExtractor={item => item.id}
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
    backgroundColor: '#774ced',
    padding: 15,
  },
  titleWrapper: {
    marginVertical: 15,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 40,
    letterSpacing: 2.5,
    color: '#f2f2f2',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.9,
    textShadowRadius: 10,
  },
  doctorsWrapper: {
    marginTop: 25,
  },
  doctorsListWrapper: {
    paddingBottom: 130,
  },
  doctorsItemWrapper: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
    paddingVertical: 17,
    paddingRight: 20,
    borderRadius: 40,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 40,
    elevation: 20,
  },
  doctorsItemImageWrapper: {
    marginHorizontal: 22,
    alignSelf: 'center',
  },
  doctorsItemImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#cab9f8',
  },
  doctorsItemTextWrapper: {
    marginRight: 65,
    paddingRight: 65,
  },
  doctorItemName: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 14,
    letterSpacing: 0.3,
    lineHeight: 17,
    color: 'black',
  },
  doctorItemSpecialty: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 14,
    letterSpacing: 0.3,
    lineHeight: 17,
    color: '#774ced',
  },
  doctorItemQualification: {
    fontFamily: 'Rubik-Medium',
    letterSpacing: 0.25,
    lineHeight: 17,
    fontSize: 13,
  },
  doctorItemClinicNo: {
    fontFamily: 'Rubik-Medium',
    letterSpacing: 0.25,
    lineHeight: 17,
    fontSize: 13,
  },
  doctorItemClinicContact: {
    fontFamily: 'Rubik-Medium',
    letterSpacing: 0.25,
    lineHeight: 17,
    fontSize: 13,
  },
  doctorItemLanguage: {
    fontFamily: 'Rubik-Medium',
    letterSpacing: 0.25,
    lineHeight: 17,
    fontSize: 13,
  },
  doctorItemGender: {
    fontFamily: 'Rubik-Medium',
    letterSpacing: 0.25,
    lineHeight: 17,
    fontSize: 13,
  },
});
