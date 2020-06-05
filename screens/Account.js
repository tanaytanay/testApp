import React from 'react';
import { Button, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Stack = createStackNavigator();


function LogoTitle() {
  return (
    <Image
      style={{ width: 150, height: 30 }}
      source={require('../assets/images/logo.png')}
    />
  );
}

function AccountScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        Welcome to Account page!
      </Text>
      
    </View>
  );
}

export default function Account({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} options={{
          headerTitle: 'WhiteHaX',
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