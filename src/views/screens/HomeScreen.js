import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, Text, View,Button} from 'react-native';
// import Button from '../components/Button';
import Navigator from '../../../Screens/Navigator';
const HomeScree = ({navigation}) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate('LoginScreen');
  };

  return (
    <View>
      <View><Navigator/></View>
      {/* <Button title="Logout" onPress={logout} /> */}
    </View>
    
  );
};

export default HomeScree;
