// components/signup.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import { Fontisto,MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
import {Button} from 'react-native-paper'
export default class Forget extends Component {
  
  constructor() {
    super();
    this.state = { 
        email: '', 
        isLoading: false
      
      
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }

    Reset=() =>{

        this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .sendPasswordResetEmail(this.state.email)
          .then((res) => {
            Alert('Please check your email, we send you a email');
            })
            console.log('Password Reset !')
            this.setState({
              isLoading: false,
              email: '', 
              
              
            })
            this.props.navigation.navigate('Login')
          }

        

  myFun=() =>{
    const {email} = this.state;
    if(email==""){
      //alert('please fill the first name');
      this.setState({Error: 'Please fill the Email'});
    }
    
  
    else{
    this.Reset();
  }

  // Keyboard.dismiss();
}
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  

<Text style={styles.box}>
      {this.state.Error}
      </Text>
      
        <View style={{flexDirection: 'row', alignSelf: 'center',width:'100%',marginLeft:'20%',marginRight:'20%'}}>
        <Fontisto name="email" size={24} color="black" />     
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        /></View>
       
        <View style={{alignItems: 'center',width: '60%'}}> 
        <Button
          color="#03045e"
          mode='contained'
          style={{
            borderRadius: "8",
            borderWidth: "1",
            margin: "10",
            elevation: "3",
            marginLeft:'60%'
          }}
          onPress={() => this.myFun()}
        >Reset
        </Button>
        </View> 
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to <Text style={{fontWeight:'bold'}}>Login</Text>
        </Text>                          
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: "80%",
    marginLeft: 5,
    marginBottom: 15,
    paddingBottom: 15,
    paddingTop: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    paddingTop: 5,
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  box: {
    // height:'30%',
    // width:'70%',
    // borderRadius:5,
    // borderWidth:'1px',
    // borderColor:'#590d22',
    // backgroundColor:'#ffccd5',
    textAlign:'center',
    color:'red'
  }
});