import React from 'react';
import { Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';

import { useFonts } from '@use-expo/font';

import { AppLoading } from 'expo';
import { Table, TableWrapper, Cell, Row, Rows } from 'react-native-table-component';

const Stack = createStackNavigator();

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



function CustomRow ({ serial, category, status, risk }) {
   
  
  let riskContainerStyle;
  let statusContainerStyle;

  if (status > 90){
    statusContainerStyle = {flex: status/100, backgroundColor: 'green', justifyContent: 'center', alignItems:'center', }
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: 'green'};
    risk = "LOW"
  }
  else if (status > 60){
    statusContainerStyle = {flex: status/100, backgroundColor: 'yellow', justifyContent: 'center', alignItems:'center', }
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: 'yellow'};
    risk = "MED"
  }
  else if (status > 30){
    statusContainerStyle = {flex: status/100, backgroundColor: 'orange', justifyContent: 'center', alignItems:'center', }
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: 'orange'};
    risk = "HIGH"
  }
  else{
    statusContainerStyle = {flex: status/100, backgroundColor: 'red', justifyContent: 'center', alignItems:'center', }
    riskContainerStyle = {flex: 2, margin: windowWidth/25, backgroundColor: 'red'};
    risk = "CRIT"
  }

  let customRowTextStyle;

  if (serial == 1 ) {
    customRowTextStyle = {...styles.firstCustomRowText};
  }
  else{
    customRowTextStyle = {...styles.customRoww_text};
  }

  
    return(
      <View style={{...styles.customRoww}}>
            
            <View style={customRowTextStyle}>
                <View style= {{flex: 4, margin: windowWidth/25,}}>
    
                  <Text style={styles.category}>
                    {category}
                
                  </Text>
    
                </View>
    
                <View style= {{flex: 5, margin: windowWidth/20, borderWidth: 0,  }}>
                  <View style = {{ flex: 1, flexDirection: 'row'}}>
                    <View style = {statusContainerStyle}> 
                      <Text style={{ fontSize: 10, textAlign: 'center'}}> {status}% </Text>
                    </View>

                    
                  </View>
                </View>
    
                <View style= {riskContainerStyle}>
                  <View style = {{flex:1, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={styles.risk}>
                      {risk}
                  
                    </Text>
                  </View>
    
                </View>
    
            </View>
    
        </View>
        );

}
const CustomListview = ({ itemList }) => (
    <View style={{...styles.customRoww, paddingTop: windowHeight/75, }}>
        <FlatList
                data={itemList}
                renderItem={({ item }) => <CustomRow
                    serial = {item.serial}
                    category={item.category}
                    status={item.status}
                    risk={item.risk}
                />}
            />

    </View>
);


function getData(){
  return [
    {
      key:"1",
      serial: "1",
      category: "This Phone",
      status: "20",
      risk: "PASS",
    },
    {
      key:"2",
      serial: "2",
      category: "Test iPad 1",
      status: "35",
      risk: "FAIL",
    },
    {
      key:"3",
      serial: "3",
      category: "Test iPad 2",
      status: "42",
      risk: "FAIL",
    },
    {
      key:"4",
      serial: "4",
      category: "Test PC 1",
      status: "40",
      risk: "FAIL",
    },
    {
      key:"5",
      serial: "5",
      category: "Test PC 2",
      status: "92",
      risk: "FAIL",
    },

    {
      key:"6",
      serial: "6",
      category: "Test iPhone 1",
      status: "22",
      risk: "FAIL",
    },

    
    

  ]
}


function DevicesScreen({navigation}) {

  let [fontsLoaded] = useFonts({
    'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else{
  return (
    

    <View style={{ ...styles.container, flex: 1, }}>
      
      

      <View style={{ ...styles.container, flex: 0.5}}>
        <Text style = {{ fontSize: windowWidth/20, color: 'black',     }}> Current Security Status </Text>
        <Text style = {{ fontSize: windowWidth/25, color: 'black',     }}> (Verified Devices) </Text>
      
      </View>

      
      <View style={{ ...styles.container, flex: 4 }}>
        <View style={{...styles.container}}>
        <CustomListview
          itemList={getData()}
        />
      </View>
      
      </View>
     
      
      

      <View style={{ ...styles.container, flex: 0.75 }}>
        <Text style = {{ fontSize: windowWidth/25, textAlign: 'center', color: 'black',    }}> WhiteHax App on each Device can provide security risk remediation steps </Text>
      </View>


    </View>

    
  );
}
};

function HeaderComponent(){
  return(
    <Text style= {{ fontSize: windowHeight/30, color:'white' }}>White<Text style= {{ fontSize: windowHeight/30, color:'red' }}>HaX</Text></Text>

  )
}

export default function Devices({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Devices" component={DevicesScreen} options={{

          headerTitle: HeaderComponent(),
          headerTitleStyle: {
            fontSize: windowWidth/15,
          },
          headerStyle: {
            backgroundColor: '#098af7',
            height: windowHeight/7.5,
          },
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
              <View style = {{ paddingLeft: windowWidth/30, }}>
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require('../assets/images/burger.png')}
                />
              </View>
            </TouchableWithoutFeedback>
            
          ),

        }}/>
      
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

  container:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#aec6cf' 
  },
  centrify:{
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  customRoww: {
        flex: 1,
        justifyContent:'center',

        flexDirection: 'row',
       
        
        
        marginTop: windowHeight/200,
        marginBottom: windowHeight/200,
        borderRadius: 5,
        backgroundColor: '#cae5f7',
        elevation: 2,


    },
    
    customRoww_text: {

        paddingBottom: windowHeight/400,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        
        justifyContent: 'center',
        borderBottomWidth: 0.25,
    },
    firstCustomRowText: {

        paddingBottom: windowHeight/20,
        paddingTop: windowHeight/20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        
        justifyContent: 'center',
        borderBottomWidth: 0.25,
    },

    category: {
        fontSize: windowWidth/25,
        color: 'black',
              
        
    },
    status: {
        
        fontSize:windowWidth/25,
        fontStyle: 'italic',
        color: 'black', 
             
    },
    risk: {
      
        fontSize: windowWidth/30,
        fontStyle: 'italic',
        color: 'black', 
        textAlign: 'center',
             
    },
  
});