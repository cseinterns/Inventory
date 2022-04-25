


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from './Screens/Navigator';
import Login from './component/Login';
import Signup from './component/Signup';

import Forget from './component/Forget';

const Stack = createStackNavigator();





function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#03045e',
              shadowRadius: 3,
              shadowOpacity: 0.5,
              shadowOffset: { width: 1, height: 3},
              
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
           
          <Stack.Screen 
            name="Signup" 
            component={Signup} 
            options={{ title: 'Signup' }}
          />       
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={
              {title: 'Login',
              headerLeft: null} 
            }
          />
           <Stack.Screen 
            name="Forget" 
            component={Forget} 
            options={
              {title: 'Reset Password',
              headerLeft: null} 
            }
          />
          <Stack.Screen 
           name="Navigator" 
           component={Navigator} 
           options={
             { title: 'STORE ORDER FORM' ,
             headerLeft: null} 
           }
          />
       

          
  
        
      </Stack.Navigator>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 export default App;








//  import React from 'react';
//  import {NavigationContainer} from '@react-navigation/native';
//  import {createNativeStackNavigator} from '@react-navigation/native-stack';
//  import LoginScreen from './src/views/screens/LoginScreen';
//  import RegistrationScreen from './src/views/screens/RegistrationScreen';
//  import HomeScreen from './src/views/screens/HomeScreen';
//  import AsyncStorage from '@react-native-async-storage/async-storage';
//  import Loader from './src/views/components/Loader';
//  import Navigator from './Screens/Navigator';
// import searchitems from './Screens/searchitems';
//  const Stack = createNativeStackNavigator();
 
//  const App = () => {
//    const [initialRouteName, setInitialRouteName] = React.useState('');
 
//    React.useEffect(() => {
//      setTimeout(() => {
//        authUser();
//      }, 2000);
//    }, []);
 
//    const authUser = async () => {
//      try {
//        let userData = await AsyncStorage.getItem('userData');
//        if (userData) {
//          userData = JSON.parse(userData);
//          if (userData.loggedIn) {
//            setInitialRouteName('HomeScreen');
//          } else {
//            setInitialRouteName('LoginScreen');
//          }
//        } else {
//          setInitialRouteName('RegistrationScreen');
//        }
//      } catch (error) {
//        setInitialRouteName('RegistrationScreen');
//      }
//    };
 
//    return (
//      <NavigationContainer>
//        {!initialRouteName ? (
//          <Loader visible={true} />
//        ) : (
//          <>
//            <Stack.Navigator
//              initialRouteName={initialRouteName}
//              screenOptions={{headerShown: false}}>
//              <Stack.Screen
//                name="RegistrationScreen"
//                component={RegistrationScreen}
//              />
//              <Stack.Screen name="LoginScreen" component={LoginScreen} />
//              <Stack.Screen   
           
             
//             name="HomeScreen" component={HomeScreen} />
//            </Stack.Navigator>
//          </>
//        )}
//      </NavigationContainer>
//    );
//  };
 
//  export default App;
 