import React, { Component } from 'react';

import firebase from '../Backend/config';
import { StyleSheet, ScrollView, ActivityIndicator, View,CheckBox,TextInput,Button } from 'react-native';
import { ListItem } from 'react-native-elements'
import { DataTable } from 'react-native-paper';


class ReadItem extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection('Orders');
    this.state = {
      isLoading: true,
      order: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const order = [];
    querySnapshot.forEach((res) => {
      const { productName, UOM, SKUID,CIQ,DateCreated,Status } = res.data();
      order.push({
        key: res.id,
        productName,
        UOM,
        SKUID,
        CIQ,
        DateCreated,
        Status,
        
      });
    });
    this.setState({
      order,
      isLoading: false
   });
  }



  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red"/>
        </View>
      )
    }    
    return (
      <View>
      <ScrollView style={styles.wrapper}>


<DataTable style={{ border: "2px solid rgb(0, 0, 0)" }}>

<DataTable.Header>
  <DataTable.Title>Date</DataTable.Title>
  <DataTable.Title varchar>SKUID</DataTable.Title>
  <DataTable.Title>Product Name</DataTable.Title>
  <DataTable.Title>Unit of Measure</DataTable.Title>
  <DataTable.Title numeric>Current Inventory Quantity</DataTable.Title>
  <DataTable.Title numeric>New Order Quantity</DataTable.Title>
  <DataTable.Title >Status</DataTable.Title>
</DataTable.Header>
<View>
          {
            this.state.order.map((res, i) => {
              return (

                <View>
                    
        <DataTable.Row>
          <DataTable.Cell chechbox>{res.DateCreated}</DataTable.Cell>
          <DataTable.Cell>{res.SKUID}</DataTable.Cell>
          <DataTable.Cell >{res.productName}</DataTable.Cell>
          <DataTable.Cell>{res.UOM}</DataTable.Cell>
          <DataTable.Cell>{res.CIQ}</DataTable.Cell>
          <DataTable.Cell numeric style={{justifyContent:"center"}}>
          {res.NOQ}</DataTable.Cell>
            <DataTable.Cell style={{justifyContent:"center"}}>
              {res.Status}
             </DataTable.Cell>
        </DataTable.Row>

              

{/* 
                <ListItem
                  key={i}
                  //  onPress={() => {
                  //     this.props.navigation.navigate('UpdateComponent', {
                  //       userkey: res.key
                  // }
                  //   );
                  // }}                   
                  bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{res.productName}</ListItem.Title>
                      <ListItem.Subtitle>{res.UOM}</ListItem.Subtitle>
                      <ListItem.Subtitle>{res.SKUID}</ListItem.Subtitle>
                      <ListItem.Subtitle>{res.CIQ}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron
                      color="black" />
                  </ListItem> */}
                  </View>
              );
            })
          }</View>
              </DataTable>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
   flex: 1,
   paddingBottom: 20
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})

export default ReadItem;