import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Button,
  CheckBox,
  FlatList,
  ActivityIndicator
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { DataTable , Searchbar} from 'react-native-paper';
import firebase from '../Backend/config';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import Dashboard from '../component/Dashboard';
import { QuerySnapshot } from 'firebase/firestore';
// import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
export default class SearchOrders extends React.Component {

  constructor() {
    super();
    this.docs = firebase.firestore().collection('Orders');
    this.state = {
       
        uid: '',
      
      isLoading: false,
      //array for storing product details
      order: [],
      orders: []
    };
  }




//Logout
  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  
fetchCollection = (querySnapshot) => {
    const order = [];
    const orders = [];
    querySnapshot.forEach((res) => {
      const { productName, UOM, SKUID,CIQ,NOQ, Status, DateCreated } = res.data();
      order.push({
        key: res.id,
        productName,
        UOM,
        SKUID,
        CIQ,
        NOQ,
        Status,
        DateCreated,
        
      });
      orders.push({
        key: res.id,
        productName,
        UOM,
        SKUID,
        CIQ
        
      });
    });
    this.setState({
      order,
      orders,
      isLoading: false
   });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  renderOrder = ({ order }) => (
        
        <DataTable >
          <DataTable.Row>
          <DataTable.Cell >{order.DateCreated}</DataTable.Cell>
          <DataTable.Cell>{order.SKUID}</DataTable.Cell>
          <DataTable.Cell >{order.productName}</DataTable.Cell>
          <DataTable.Cell>{order.UOM}</DataTable.Cell>
          <DataTable.Cell>{order.CIQ} </DataTable.Cell>
          <DataTable.Cell>{order.NOQ}</DataTable.Cell>
          <DataTable.Cell>{order.Status}</DataTable.Cell>
        </DataTable.Row>
          </DataTable>

         
  );

  searchorders = value => {
    const filteredorder = this.state.order.filter(orders => {
      let ProductLowercase = (
        orders.productName   ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return ProductLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ orders: filteredorder });
  };

  searchsku = value => {
    const filteredorderid = this.state.order.filter(orders => {
      let skuLowercase = (
        orders.SKUID   ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return skuLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ orders: filteredorderid });
  };



  
  render() {
    return (
      <View style={{ flex: 1,backgroundColor: '#ffffff'   }}>
        <SafeAreaView style={{  }} />
        <View>
        <Searchbar
          placeholder="Search by Product Name"
          placeholderTextColor="#000000"
          style={{
            backgroundColor: '#E6F3F5',
            height: 50,
            fontSize: "50%",
            padding: 10,
            margin:15,
            color: 'white',
            width: "42.5%",
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0'
          }}
          onChangeText={value => this.searchorders(value)}
        />
        </View>
        <View>
        <Searchbar
          placeholder="Search by SKUID"
          placeholderTextColor="#000000"
          style={{
            backgroundColor: '#E6F3F5',
            height: 50,
            fontSize: "50%",
            padding: 10,
            margin: 15,
            width: "42.5%",
            color: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0'
          }}
          onChangeText={value => this.searchsku(value)}
        />  
        </View>
        <View style={{ flex: 1}}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#bad555" />
            </View>
          ) : null}
          <View style={{backgroundColor: '#ffffff' ,alignItems:'center',margin:10}}>
          <DataTable style={styles.Table}>

<DataTable.Header style={{backgroundColor: "#E6F3F5"}}>
  <DataTable.Title><Text style={{color:"black",fontSize:14,fontFamily:'TimesNewRoman',alignContent:'center'}}>DateCreated</Text></DataTable.Title>
  <DataTable.Title varchar><Text style={{color:"black",fontSize:14,fontFamily:'TimesNewRoman',alignSelf:'center'}}>SKUID</Text></DataTable.Title>
  <DataTable.Title><Text style={{color:"black",fontSize:14,fontFamily:'TimesNewRoman'}}>Product Name</Text></DataTable.Title>
  <DataTable.Title><Text style={{color:"black",fontSize:14,fontFamily:'TimesNewRoman'}}>Unit of Measure</Text></DataTable.Title>
  <DataTable.Title numeric><Text style={{color:"black",fontSize:14,fontFamily:'TimesNewRoman',textAlign:'center'}}>Current Inventory Quantity</Text></DataTable.Title>
  <DataTable.Title numeric><Text style={{color:"black",fontSize:14,fontFamily:'TimesNewRoman',alignSelf:'center'}}>New Order Quantity</Text></DataTable.Title>
  <DataTable.Title><Text style={{color:"black",fontSize:14,fontFamily:'TimesNewRoman'}}>Status</Text></DataTable.Title>
</DataTable.Header>
<ScrollView style={styles.wrapper}>
          <FlatList
            data={this.state.orders}
            renderOrder={this.renderOrder}
            keyExtractor={(order, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >

                <Text style={{ color: '#890620',fontsize:36 ,fontStyle:'serif' ,fontWeight: 'bold'}}>No Orders Found</Text>
              </View>
            )}
          />
</ScrollView>
          </DataTable>
          </View>
        </View>
        <View styles={styles.footerbutton}>

        <View style={styles.Button}>
        <Button
              color="#03045e"
              borderRadius="8"
              borderWidth="1"
              margin="10"
              elevation="3"
              title="Logout"
              onPress={() => this.signOut()} 
            />
        </View></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    justifyContent: 'center'
  },
  wrapper: {
    flex: 1,
    // paddingBottom: 20
   },
   loader: {
     position: 'absolute',
     alignItems: 'center',
     justifyContent: 'center',    
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
   },
   footerbutton:{
    flexDirection: 'row' ,  
    justifyContent: 'space-evenly' , 
    
    marginTop:40,
  },
  Table:{
    borderRadius: 5,
    margin:5, 
    border: "1px solid ",
    borderColor:"#03045e",
    height: "100%",
    width: "100%",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3}
  },
  Button: {
    flex: 1,
    width: '40%',
    height: 40,
    padding: 10,
  }
});