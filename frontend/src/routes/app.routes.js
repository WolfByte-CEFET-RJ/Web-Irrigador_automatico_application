// * Rotas autenticadas

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/home/Home';
import AddGarden from '../pages/addGarden/AddGarden';
import ViewGarden from '../pages/viewGarden/ViewGarden';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AddGarden" component={AddGarden} />
    <Stack.Screen name="ViewGarden" component={ViewGarden} />
  </AppStack.Navigator>
);

export default AppRoutes;