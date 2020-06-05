import * as React from 'react';
import { ImageBackground, AsyncStorage, Button, Text, TextInput, View, StyleSheet, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import Dashboard from './screens/Dashboard.js';
import DetailsPage from './screens/DetailsPage.js';
import Devices from './screens/Devices.js';
import Remediation from './screens/Remediation.js';
import Account from './screens/Account.js';
import Settings from './screens/Settings.js';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Drawer = createDrawerNavigator();
import { useFonts } from '@use-expo/font';



function CustomDrawerContent(props) {
  let [fontsLoaded] = useFonts({
    'DidactGothic-Regular': require('./assets/fonts/DidactGothic-Regular.ttf'),
  });
  const { signOut } = React.useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sign Out" labelStyle = {{ color: 'black',       }} onPress={signOut} />
    </DrawerContentScrollView>
  );
}


function Home() {
  let [fontsLoaded] = useFonts({
    'DidactGothic-Regular': require('./assets/fonts/DidactGothic-Regular.ttf'),
  });
  const { signOut } = React.useContext(AuthContext);
  return (
    
      
      
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
        drawerStyle= {{ backgroundColor: '#aec6cf', }} 
        drawerContentOptions = {{
          activeTintColor: 'black',
          itemStyle: { marginVertical: 5, },
          labelStyle: { color: 'black',       }
        }} 
        initialRouteName="Home"
      >
        
        
        <Drawer.Screen name="Home" component={Dashboard} />
        <Drawer.Screen name="Details" component={DetailsPage} />
        <Drawer.Screen name="Devices" component={Devices} />
        <Drawer.Screen name="Remediation" component={Remediation} />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Settings" component={Settings} />
        
        
      </Drawer.Navigator> 
      
    
  )
}


const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);
  
  return (
    <View style= {{ flex:1, backgroundColor: ''}}>
      <ImageBackground source = {require('./assets/images/bg.jpg')} style= {{flex: 1, resizeMode: 'cover', justifyContent: 'center',}}>
        <View style = {{ ...styles.centrify, flex: 1,}}>
              <Text style= {{ fontSize: windowHeight/20, color:'white' }}>White<Text style= {{ fontSize: windowHeight/20, color:'red' }}>HaX</Text></Text>


        </View>

        <View style = {{ ...styles.centrify, flex: 2, flexDirection: 'row',  }}>
          <View style = {{ ...styles.centrify, flex: 1, }}>
              
          </View>
          <View style = {{ ...styles.centrify, flex: 5, flexDirection: 'column',  backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: windowWidth/25}}>
            <View style = {{...styles.centrify}}>
              <View style={{ borderWidth: 1, borderColor: 'white', width: windowWidth/2.5, height: windowHeight/20, justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: windowHeight/100,  }}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor = "white"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View style={{ borderWidth: 1, borderColor: 'white', width: windowWidth/2.5, height: windowHeight/20, justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: windowHeight/100,  }}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor = "white"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <View style={{ borderWidth: 1, backgroundColor: '#00bfff', borderColor: '#00bfff', width: windowWidth/2.5, height: windowHeight/20, justifyContent: 'center', alignItems: 'center', borderRadius: 75, margin: windowHeight/100,  }}>
                <TouchableHighlight
                  style={{ backgroundColor: '#00bfff' }}
                  onPress={() => signIn({ username, password })}
                  
                >
                  <Text style={{ color: 'white'}}>Sign In</Text>
                </TouchableHighlight>
                
              </View> 
            </View>
          </View>
          <View style = {{ ...styles.centrify, flex: 1, }}>
              
          </View>    
        </View>

        <View style = {{ ...styles.centrify, flex: 1, }}>
              
        </View>
      </ImageBackground>
    </View>
  );
}




const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
        >
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',

            // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({

  centrify:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    
  },
})
