import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BeforeLoginNav from './navigators/BeforeLoginNav';
import CompleteNav from './navigators/CompleteNav';
import {NavigationContainer} from '@react-navigation/native';


export default class App extends Component<Props> {
  
  render () {
    return (
      <NavigationContainer>
        <BeforeLoginNav />
      </NavigationContainer>
    );
  }
}

/*
const App = () => {

   const [loggedIn, setloggedIn] = useState(false);

  getData = async () => {
    try {
      const data = await AsyncStorage.getItem ('loggedIn');
      console.log (data);
      setloggedIn(data);
    } catch (error) {
      console.log (error);
    }
  };

  useEffect(() => {
    getData();
  
    
  }, []);

  return(
    <NavigationContainer>
      {loggedIn ? <CompleteNav /> : <BeforeLoginNav/>}
    </NavigationContainer>
  );
  

}

export default App;
*/




