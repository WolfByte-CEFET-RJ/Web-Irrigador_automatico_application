// * Rotas não autenticadas

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "../pages/signUp/SignUp";
import LogIn from "../pages/signIn/LogIn";

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
    <AuthStack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SignIn" component={LogIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );

  export default AuthRoutes;