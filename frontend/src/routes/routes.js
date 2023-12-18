import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './../pages/signUp/SignUp'; 
import LogIn from './../pages/signIn/LogIn';
import Home from './../pages/home/Home';
import AddGarden from '../pages/addGarden/AddGarden';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddGarden" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddGarden" component={AddGarden} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
