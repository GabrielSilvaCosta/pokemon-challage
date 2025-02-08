import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import {
  FavoritesProvider,
  FavoritesContext,
} from "../app/context/FavoritesContext";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Favorites") {
            iconName = "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <FavoritesProvider>
      <AppNavigator />
    </FavoritesProvider>
  );
}
