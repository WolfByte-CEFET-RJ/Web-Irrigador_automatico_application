import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./../pages/signUp/SignUp";
import LogIn from "./../pages/signIn/LogIn";
import Home from "./../pages/home/Home";
import AddGarden from "../pages/addGarden/AddGarden";
import ViewGarden from "../pages/viewGarden/ViewGarden";
import Profile from "../pages/profile/Profile";
import ViewConfig from "../pages/ViewConfig/ViewConfig";
import irrigationHistory from "../pages/IrrigationHistory/IrrigationHistory";

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddGarden" component={AddGarden} />
        <Stack.Screen name="ViewGarden" component={ViewGarden} />
        <Stack.Screen name="ViewConfig" component={ViewConfig} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="IrrigationHistory" component={irrigationHistory}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
