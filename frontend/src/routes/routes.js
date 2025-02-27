import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./../pages/signUp/SignUp";
import LogIn from "./../pages/signIn/LogIn";
import Home from "./../pages/home/Home";
import AddGarden from "../pages/addGarden/AddGarden";
import ViewGarden from "../pages/viewGarden/ViewGarden";
import Profile from "../pages/profile/Profile";
import ViewConfig from "../pages/ViewConfig/ViewConfig";
import IrrigationHistory from "../pages/IrrigationHistory/IrrigationHistory";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import Confirm_newPasswords from "../pages/confirm_newPassword/Confirm_newPasswords";

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
        <Stack.Screen name="AddGarden" component={AddGarden} />
        <Stack.Screen name="ViewConfig" component={ViewConfig} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ViewGarden" component={ViewGarden} />
        <Stack.Screen name="IrrigationHistory" component={IrrigationHistory} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name= "ConfirmPassword" component={Confirm_newPasswords} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
