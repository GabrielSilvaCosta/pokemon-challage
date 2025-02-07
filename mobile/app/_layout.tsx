import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoriteScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [favoritesCount, setFavoritesCount] = useState(0);

  // const loadFavorites = async () => {
  //   const stored = await AsyncStorage.getItem("favorites");
  //   setFavoritesCount(stored ? JSON.parse(stored).length : 0);
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     loadFavorites();
  //   }, [])
  // );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favoritos") {
            iconName = focused ? "heart" : "heart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
          tabBarBadge: favoritesCount > 0 ? favoritesCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
}
