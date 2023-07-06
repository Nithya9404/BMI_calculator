import { Button, StyleSheet, Image, View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CreateAccountForm from './screens/CreateAccount';
import BMI from './screens/BMIScreen';
import Login from './screens/Login';


const placeholder = require('./assets/bmi.jpg')
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Create Account" component={CreateAccountForm}></Stack.Screen>
        <Stack.Screen name="Login"  component={Login}/>
        <Stack.Screen name="BMI"  component={BMI}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}){
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to BMI Calculator</Text>
      <View style={styles.buttonSpacing}></View>
      <View style={styles.buttoncontainer}>
      <Button style={styles.button} title='Create Account' onPress={() => navigation.navigate('Create Account')}></Button>
      <View style={styles.buttonSpacing} /> 
      <Button style={styles.button} title='Login' onPress={() => navigation.navigate('Login')}></Button>

      </View>
      <View style={styles.imagecontainer}>
      <Image source={placeholder} style={styles.image}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  text:{
    fontSize:30,
    fontWeight:'bold',
    alignItems:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#008081',
    alignItems:'center'
  },
  image:{
    height:340,
    width:420,
    alignItems:'center'
  },
  buttoncontainer:{
    width: 320,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 5,
   
  },
  button:{
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor:'#363636',
  },
  imagecontainer: {
      paddingTop: 58,
      zIndex: 1,
      alignItems:'center'
    },
  buttonSpacing:{
    height:10
  }
});
