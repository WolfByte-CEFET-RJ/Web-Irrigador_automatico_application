import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './../pages/signUp/SignUp'; 
import LogIn from './../pages/signIn/LogIn';
import Home from './../pages/home/Home';
import AddGarden from '../pages/addGarden/AddGarden';
import ViewGarden from '../pages/viewGarden/ViewGarden';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddGarden" component={AddGarden} />
        <Stack.Screen name="ViewGarden" component={ViewGarden} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
