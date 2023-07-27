import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from 'react-navigation/stack';
import {createBottomTabNavigator} from 'react-navigation/bottom-tabs';
import Moment from 'moment';
import {PrintCovidResult} from '../components/UI';

const CovidLatestScreen = () => {
  let now = new Date ();
  let yesterday = new Date (now);
  yesterday.setDate (yesterday.getDate () - 1);

  const [dataOne, setDataOne] = useState ();
  const [dataTwo, setDataTwo] = useState ();
  const [isLoading, setisLoading] = useState (false);
  const [keyword, setkeyword] = useState (
    Moment (yesterday).format ('YYYY-MM-DD').toString ()
  );

  let url = 'https://msiacovidapi.herokuapp.com/?start_date=' + keyword;
  let url2 = 'https://covid19.mathdro.id/api/countries/Malaysia';

  useEffect (() => {
    const fetchData = async () => {
      setisLoading (true);
      try {
        const result1 = await fetch (url);
        const result2 = await fetch (url2);
        const response1 = await result1.json ();
        const response2 = await result2.json ();
        setDataOne (response1);
        setDataTwo (response2);
        setisLoading (false);
        //console.log(response1,'response');
        //console.log(response2,'response');
      } catch (e) {
        console.log (e);
      }
    };

    fetchData ();
  }, []);

  if(isLoading) {
    return (
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <ActivityIndicator/>
         </View>
    )
   }

  return (
    <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>

      
        <View style={{marginTop: 20}}>
          <Text style={styles.title}>COVID-19</Text>
          <Text style={styles.title}>LATEST UPDATE</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 50}}>

          <View style={{marginRight: 5, alignItems: 'center'}}>
            <PrintCovidResult
              name="pulse"
              number={dataOne ? dataOne[keyword].cases_new : 0}
              title="Active"
              theme="active"
            />
          </View>

          <View style={{marginLeft: 5}}>
            <PrintCovidResult
              name="skull"
              number={dataOne ? dataOne[keyword].deaths_new : 0}
              title="Death"
              theme="death"
            />
          </View>

        </View>

        <View style={{flexDirection: 'row', marginTop:10}}>

          <View style={{marginRight: 5, alignItems: 'center'}}>
            <PrintCovidResult
              name="pulse"
              number={dataTwo ? dataTwo.confirmed.value : 0}
              title="Confirmed"
              theme="total_confirmed"
            />
          </View>

          <View style={{marginLeft: 5}}>
            <PrintCovidResult
              name="skull"
              number={dataTwo ? dataTwo.deaths.value : 0}
              title="Total Death"
              theme="total_death"
            />
          </View>

        </View>

    </View>
  );
};

export default CovidLatestScreen;

const styles = StyleSheet.create ({
  title: {
    color: 'black',
    fontSize: 35,
    textShadowOffset: {width: 5, height: 2},
    textShadowRadius: 20,
    textShadowColor: 'grey',
    fontFamily:'Roboto-Bold',
  },
});
