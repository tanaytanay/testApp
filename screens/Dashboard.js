import React, { useRef, useState, useEffect, Component } from "react";
import { Animated, Modal, Button, View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TouchableHighlight,SafeAreaView, ScrollView  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { VictoryLegend, VictoryPie, VictoryLabel } from "victory-native";
import Constants from 'expo-constants';
//import {} from 'react';
import { useFonts } from '@use-expo/font';
import * as Progress from 'react-native-progress';

const readiness = 20;
const spreadData = [{ y: 1 }, { y: 8 }, { y: 3 }, { y: 7 }, { y: 2 }, { y: 4 }];
const spreadColor = ["#db3913", "#970199", "#1d2a77", "#04968b", "#f89a05","#179314"];
const readinessData = [{ y: readiness }, { y: 100 - readiness }, ];
const readinessColor = ["#db3913", "#8198a6"];
const labelData = [''];


import { Icon } from 'react-native-elements'
import Speedometer from 'react-native-speedometer-chart';
import Pie from 'react-native-pie';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Stack = createStackNavigator();


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}



function DashboardScreen({navigation}) {




  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [runValue, setRunValue] = useState(0);
  const [syncValue, setSyncValue] = useState(0);
  const [runStatus, setRunStatus] = useState("Running Security Checks...");
  const [syncStatus, setSyncStatus] = useState("Syncing Devices...");
  const [runButton, setRunButton] = useState(true);
  const [syncButton, setSyncButton] = useState(true);

  let runValueShow = Math.round(runValue * 100);
  let syncValueShow = Math.round(syncValue * 100);
  
 
  
  let intervalRun, intervalSync;


  let [fontsLoaded] = useFonts({
    'DidactGothic-Regular': require('../assets/fonts/DidactGothic-Regular.ttf'),
  });

  let animation = useRef(new Animated.Value(0));
  let [progress, setProgress] = useState(0);
  useInterval(() => {
    if(progress < 100) {
      setProgress(progress + 1);
    }
  }, 1000);
  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 100
    }).start();
  },[progress])

  let width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })

  function animateRun() {
    let temp = 0;

    setRunValue(temp);
      
      
        intervalRun = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalRun);
            let temp2 = temp - 1;
            temp = temp - temp2;
            setRunStatus("Security Check Complete!");
            setRunButton(false);
          }

          setRunValue(temp)
        }, 500);
      
      
      
    
  }
  function animateSync() {
    let temp = 0;
    setSyncValue(temp);
      
      
        intervalSync = setInterval(() => {
          temp+= Math.random() / 5;;
          if (temp > 1){            
            clearInterval(intervalSync);
            let temp2 = temp - 1;
            temp = temp - temp2;
            setSyncStatus("Sync Complete!");
            setSyncButton(false);
          }

          setSyncValue(temp)
        }, 500);
      
      
      
    
  }


  
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
  return (

    <View style={{ ...styles.centrify, flex: 1 }}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: 'white' }} >
                <Text style={styles.modalText}>Security Check</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 4, backgroundColor: 'white' }} >
                <Progress.Bar
                  style={styles.progressBar}
                  progress={runValue}
                />
                <Text>{runValueShow}%</Text>
                <Text style = {{ marginTop: 20, fontSize: 15 }}>{runStatus}</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: 'white' }} >
                <TouchableHighlight
                  style={ { ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  disabled = {runButton}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal2Visible}
          
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: 'white' }} >
                <Text style={styles.modalText}>Sync</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 4, backgroundColor: 'white' }} >
                <Progress.Bar
                  style={styles.progressBar}
                  progress={syncValue}
                />
                <Text>{syncValueShow}%</Text>
                <Text style = {{ marginTop: 20, fontSize: 15 }}>{syncStatus}</Text>
              </View>

              <View style = {{ ...styles.centrify, flex: 1, backgroundColor: 'white' }} >
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModal2Visible(!modal2Visible);
                  }}
                  disabled = {syncButton}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>                
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ ...styles.centrify, flex: 6, }}>
        
          <SafeAreaView>
            <ScrollView>
              <View style={{ ...styles.centrify, flex: 1 }}>
                <View style = {{ ...styles.container, }}>
                  <View style={{ paddingTop: windowHeight/30, }}>
                    <Text style= {{ fontSize: windowHeight/30,      }}> Security Readiness </Text>

                  </View>
                </View>
                <View style = {{ ...styles.container, flexDirection: 'row', }}>
                  <View style = {{ ...styles.container, flex: 2  }}>
                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>
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
                    <View style = {{ ...styles.centrify, flex: 1, paddingBottom: 30 }}>
                      <Text style = {{ fontSize: 15,      }}> {readiness}% </Text>
                      <Text style = {{ fontSize: 15,      }}> {securityLevel} </Text>
                    </View>
                    
                  </View>
                  <View style = {{ ...styles.container, flex: 1, paddingTop: windowHeight/100, flexDirection: 'column', marginRight: windowWidth/50, }}>
                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0, borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }}>
                      
                      <View  style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>
                        <Text style = {{      }}> Total Checks </Text>
                      </View>
                      <View  style = {{ ...styles.centrify, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: 30,      }}> 62 </Text>
                      </View>

                    </View>

                    <View style = {{ ...styles.centrify, flex: 1, borderWidth: 0, borderBottomWidth: 1, marginLeft: 5, marginRight: 5 }}>

                      <View  style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>
                        <Text style = {{      }}> Passed </Text>
                      </View>
                      <View  style = {{ ...styles.centrify, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: 30,      }}> 13 </Text>
                      </View>

                    </View>

                    <View style = {{ ...styles.centrify, flex: 1.3, borderWidth: 0 }}>

                      <View  style = {{ ...styles.centrify, flex: 1, borderWidth: 0 }}>
                        <Text style = {{      }}> Failed </Text>
                      </View>
                      <View  style = {{ ...styles.centrify, flex: 2, borderWidth: 0 }}>
                        <Text style = {{ fontSize: 30,      }}> 49 </Text>
                      </View>

                    </View>
                  </View>
                </View>
                <View style = {{ ...styles.container, }}>
                  <View style={{  }}>
                    <Text style= {{ fontSize: windowHeight/30,      }}> Security Spread </Text>
                  </View>
                </View>
                <View style = {{ ...styles.container, flexDirection: 'row', }}>
                  <View style = {{ ...styles.container, flex: 2  }}>
                    <VictoryPie
                      animate={{ easing: 'exp',}}
                      data={spreadData}
                      width={windowWidth/1.8}
                      height={windowWidth/1.8}
                      colorScale={spreadColor}
                      innerRadius={windowWidth/6}
                      labels={labelData}
                      startAngle = {0}
                      endAngle = {360}
                    />
                  </View>
                  <View style = {{ ...styles.container, flex: 1, paddingTop: windowHeight/100 }}>
                    <VictoryLegend 
                      x={0} 
                      y={0}
                      height = {windowHeight/3.5}
                      width= {windowWidth/3}
                      itemsPerRow= {6}
                      orientation="vertical"
                      gutter={windowWidth/10}
                      style={{  }}
                      colorScale={spreadColor}
                      data={[
                        { name: "Device" }, { name: "Email" }, { name: "WiFi" }, { name: "Data" }, { name: "Firewall" }, { name: "Web" }
                      ]}
                    />
                  </View>
                </View>
                
              </View>
            </ScrollView>
          </SafeAreaView>


      
    
        </View>
        <View style={{ ...styles.centrify, flex: 1, flexDirection: 'row',  borderWidth: 0.25, }}>
          <View style={{ ...styles.centrify, flex: 1, }}>
            <View style={{ ...styles.centrify, flex: 4, }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(true);
                  setRunStatus("Running Security Check...");
                  animateRun();

                }}
              >
                <Image
                style={{ width: windowWidth/15, height: windowWidth/15, }}
                source={require('../assets/images/run.png')}
              />
              <Text style = {{     }}> Run </Text>
              </TouchableOpacity>
              
            </View>
            <View style={{ ...styles.centrify, flex: 1, }}>
            </View>  
          </View>

          <View style={{ ...styles.centrify, flex: 1, }}>
            <View style={{ ...styles.centrify, flex: 4, }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModal2Visible(true);
                  setSyncStatus("Syncing Devices...");
                  animateSync();
                }}
              >
                <Image
                style={{ width: windowWidth/15, height: windowWidth/15, }}
                source={require('../assets/images/sync.png')}
              />
                <Text style = {{     }}> Sync </Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.centrify, flex: 1, }}>
            </View>  
          </View>
          
        </View>
      
      </View>
  );
}



function HeaderComponent(){
  return(
    <Text style= {{ fontSize: windowHeight/30, color:'white' }}>White<Text style= {{ fontSize: windowHeight/30, color:'red' }}>HaX</Text></Text>

  )
}
export default function Dashboard({ navigation }) {
  return (

    <Stack.Navigator>

      <Stack.Screen name="Home" component={DashboardScreen} options={{
          
          headerTitleStyle: {
            fontSize: windowWidth/15,
            color: 'white',
          },
          headerStyle: {
            backgroundColor: '#098af7',
            height: windowHeight/7.5,
          },
          title: HeaderComponent(),
          headerLeft: () => (
            <TouchableWithoutFeedback  onPress={() => navigation.toggleDrawer()}>
              <View style = {{ paddingLeft: windowWidth/30, }}>
                <Image
                  style={{ width: 35, height: 35, }}
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
    width: windowWidth,
    
    borderWidth: 0,
  },
  centrify:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#aec6cf' 
  },
  button: {
    alignItems: "center",
    
    
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: windowHeight/2,

    width: windowWidth/1.2,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
         
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
         
  },

  progressBarContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  progressBar: {
    margin: 10,
  },
});