import React from 'react';
import { Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Table, TableWrapper, Cell, Row, Rows } from 'react-native-table-component';
import { useFonts } from '@use-expo/font';
import { VictoryLegend, VictoryPie, VictoryLabel } from "victory-native";

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const readiness = 20;
const readinessData = [{ y: readiness }, { y: 100 - readiness }, ];
const readinessColor = ["#db3913", "#8198a6"];
const labelData = [''];
function CustomRow ({ category, status, risk }) {
   
  
  let riskContainerStyle;
  let statusContainerStyle;

  if (status > 90){
    statusContainerStyle = {flex: status/100, backgroundColor: 'green'}
    riskContainerStyle = {flex: 1, margin: windowWidth/25, backgroundColor: 'green',  justifyContent: 'center', alignItems:'center', };
    risk = "PASS"
  }
  else if (status > 60){
    statusContainerStyle = {flex: status/100, backgroundColor: 'yellow'}
    riskContainerStyle = {flex: 1, margin: windowWidth/25, backgroundColor: 'yellow',  justifyContent: 'center', alignItems:'center', };
    risk = "PASS"
  }
  else if (status > 30){
    statusContainerStyle = {flex: status/100, backgroundColor: 'orange'}
    riskContainerStyle = {flex: 1, margin: windowWidth/25, backgroundColor: 'orange',  justifyContent: 'center', alignItems:'center', };
    risk = "FAIL"
  }
  else{
    statusContainerStyle = {flex: status/100, backgroundColor: 'red'}
    riskContainerStyle = {flex: 1, margin: windowWidth/25, backgroundColor: 'red',  justifyContent: 'center', alignItems:'center', };
    risk = "FAIL"
  }

  
    return(
      <View style={{...styles.customRoww}}>
            
            <View style={{...styles.customRoww_text}}>
                <View style= {{flex: 3, margin: windowWidth/25,}}>
    
                  <Text style={styles.category}>
                    {category}
                
                  </Text>
    
                </View>
    
                <View style= {{flex: 3, margin: windowWidth/20, borderWidth: 0,  }}>
                  <View style = {{ flex: 2, flexDirection: 'row'}}>
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
    <View style={{...styles.customRoww, paddingTop: windowHeight/75,}}>
        <FlatList
                
                data={itemList}
                renderItem={({ item }) => <CustomRow
                    category={item.category}
                    status={item.status}
                    risk={item.risk}
                />}
            />

    </View>
);


function getData(){
  //var pass_fail = status > 60 ? "pass" : "fail";
  
  return [
    {
      key :"1",
      category: "Device Security",
      status:  "91",
      risk: "PASS",
    },
    {
      key :"2",
      category: "Email Security",
      status:  "40",
      risk: "PASS",
    },
    {
      key :"3",
      category: "Web Security",
      status:  "35",
      risk: "FAIL",
    },
    {
      key :"4",
      category: "Firewall Security",
      status:  "22",
      risk: "FAIL",
    },
    {
      key :"5",
      category: "WiFi Security",
      status:  "62",
      risk: "PASS",
    },
    {
      key :"6",
      category: "Data Security",
      status: "42",
      risk: "FAIL",
    },
  ]
}
function DetailsScreen({navigation}) {

  let internalColor;
  let securityLevel;
  if (readiness > 60){
    internalColor = "#179314";
    securityLevel = "Secure"
  }
  else if (readiness > 30){
    internalColor = "#f89a05";
    securityLevel = "Average"
  }
  else{
    internalColor = "#db3913";
    securityLevel = "Critical"
  }
  let [fontsLoaded] = useFonts({
    'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  });
  return (
    

    <View style={{ ...styles.container, flex: 1 }}>
      
      

      <View style={{ ...styles.container, flex: 0.5 }}>
        <Text style = {{ fontSize: windowWidth/20, color: 'black',       }}> Current Status </Text>
      
      </View>

      <View style={{ ...styles.container, flex: 2 }}>
        <View style = {{ ...styles.container, flexDirection: 'row', }}>
                  <View style = {{ ...styles.container, flex: 2  }}>
                    <View style = {{ ...styles.centrify1, flex: 1, borderWidth: 0, paddingTop: windowHeight/15, }}>
                      <VictoryPie
                      animate={{ easing: 'exp',}}
                      data={readinessData}
                      width={windowWidth/1.8}
                      height={windowWidth/1.8}
                      colorScale={readinessColor}
                      innerRadius={windowWidth/6}
                      labels={labelData}
                      startAngle = {-135}
                      endAngle = {135}
                    />
                    </View>
                    <View style = {{ ...styles.centrify1, flex: 1, paddingBottom: 30 }}>
                      <Text style = {{ fontSize: 15,      }}> {readiness}% </Text>
                      <Text style = {{ fontSize: 15,      }}> {securityLevel} </Text>
                    </View>
                    
                  </View>
                  <View style = {{ ...styles.container, flex: 1, paddingTop: windowHeight/100, flexDirection: 'column', marginRight: windowWidth/50, }}>
                    <View style = {{ ...styles.centrify1, flex: 1, borderWidth: 0, borderBottomWidth: 0.25, marginLeft: 5, marginRight: 5 }}>
                      
                      <View  style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>
                        <Text style = {{}}> Total Checks </Text>
                      </View>
                      <View  style = {{ ...styles.centrify1, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: 15,      }}> 62 </Text>
                      </View>

                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0, borderBottomWidth: 0.25, marginLeft: 5, marginRight: 5 }}>

                      <View  style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>
                        <Text style = {{}}> Passed </Text>
                      </View>
                      <View  style = {{ ...styles.centrify1, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: 15,      }}> 13 </Text>
                      </View>

                    </View>

                    <View style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify1, flex: 1, borderWidth: 0 }}>
                        <Text style = {{}}> Failed </Text>
                      </View>
                      <View  style = {{ ...styles.centrify1, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: 15,      }}> 49 </Text>
                      </View>

                    </View>
                  </View>
                </View>
      
      </View>

      
      <View style={{ ...styles.container, flex: 3 }}>
        <View style={{...styles.container, }}>
        <CustomListview
          itemList={getData()}
        />
      </View>
      
      </View>
     
      
      

      <View style={{ ...styles.container, flex: 1 }}>
        <Text style = {{ fontSize: windowWidth/25, color: 'black',          }}> Please go to Remediation for further Guidance </Text>
      </View>


    </View>

    
  );
}
function HeaderComponent(){
  return(
    <Text style= {{ fontSize: windowHeight/30, color:'white' }}>White<Text style= {{ fontSize: windowHeight/30, color:'red' }}>HaX</Text></Text>

  )
}
export default function DetailsPage({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Details" component={DetailsScreen} options={{
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
  centrify1:{
    justifyContent: 'center',
    alignItems: 'center',
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