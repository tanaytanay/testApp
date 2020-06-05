import React from 'react';
import { Button, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';


import Dashboard from './screens/Dashboard.js';
import DetailsPage from './screens/DetailsPage.js';
import Devices from './screens/Devices.js';
import Remediation from './screens/Remediation.js';
import Account from './screens/Account.js';
import Settings from './screens/Settings.js';




const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'TabA') {
        iconName = focused
        ? 'ios-information-circle'
        : 'ios-information-circle-outline';
      } else if (route.name === 'TabB') {
        iconName = focused
        ? 'ios-list-box'
        : 'ios-list';
      }
return <Ionicons name={iconName} size={size} color={color}     />;
        },
      })}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="TabA" component={TabAScreen} />
        <Tab.Screen name="TabB" component={TabBScreen} />
    </Tab.Navigator>
  );
}
function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>No New Notifications!</Text>
      <Button 
      onPress={() => navigation.goBack()}
      title="Go back home"
      />
    </View>
  );
}




const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 35, height: 35 }}
      source={require('./assets/images/burger.png')}
    />
  );
}
function TabAScreen({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabA Home" component={TabADetailsScreen} options={{
          //headerTitle: 'WhiteHaX',
          headerStyle: {
            backgroundColor: '#098af7',
          },
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
              <View>
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require('./assets/images/burger.png')}
                />
              </View>
            </TouchableWithoutFeedback>
            
          ),
        }}/>
      <Stack.Screen name="TabA Details" component={Details} />
    </Stack.Navigator>
  );
}
function TabADetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        Welcome to TabA page!
      </Text>
      <Button 
      onPress={() => navigation.navigate('TabA Details')}
      title="Go to TabA Details"
      />
    </View>
  );
}
function Details() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        TabA Details here!
      </Text>
    </View>
  );
}
function TabBScreen() {
  return (
    <View>
      <Text style={{textAlign: 'center', marginTop: 300}}>
        Welcome to TabB page!
      </Text>
    </View>
  );
}
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    
    <NavigationContainer >
      <Drawer.Navigator  
        drawerStyle= {{ backgroundColor: '#aec6cf', }} 
        drawerContentOptions = {{
          activeTintColor: '#cae5f7',
          itemStyle: { marginVertical: 10, },
          labelStyle: { color: 'white'}
        }} 
        initialRouteName="Home"
      >
        
        
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Details" component={DetailsPage} />
        <Drawer.Screen name="Devices" component={Devices} />
        <Drawer.Screen name="Remediation" component={Remediation} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Settings" component={Settings} />
        
        
      </Drawer.Navigator>
    </NavigationContainer>
  )
}