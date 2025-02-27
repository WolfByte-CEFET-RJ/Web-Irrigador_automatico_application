import React from "react";
import { View, Pressable } from "react-native";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BottomBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const isAddGardenScreen = route.name === "AddGarden";
  const isHomeScreen = route.name === "Home";
  const isViewConfig = route.name === "ViewConfig";
  const isProfile = route.name === "Profile";
  const isIrrigationHistory = route.name === "IrrigationHistory";

  return (
    <View style={styles.bottomBar_container}>
      <Pressable onPress={() => navigation.navigate("AddGarden")}>
        <Ionicons
          style={styles.iconCadastro}
          name={"leaf"}
          size={24}
          color={isAddGardenScreen ? "#40513B" : "#609966"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("ViewConfig")}>
        <Ionicons
          style={styles.iconCadastro}
          name={"cog"}
          size={24}
          color={isViewConfig ? "#40513B" : "#609966"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Ionicons
          style={styles.iconCadastro}
          name={"home"}
          size={24}
          color={isHomeScreen ? "#40513B" : "#609966"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("IrrigationHistory")}>
      <Ionicons
        style={styles.iconCadastro}
        name={"rainy"}
        size={24}
        color={isIrrigationHistory? "#40513B" : "#609966"}
      />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Ionicons
          style={styles.iconCadastro}
          name={"person"}
          size={24}
          color={isProfile ? "#40513B" : "#609966"}
        />
      </Pressable>
    </View>
  );
}
