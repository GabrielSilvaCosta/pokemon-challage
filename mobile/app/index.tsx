import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import { useCallback } from "react";

const Tab = createBottomTabNavigator();

const FavoritesWrapper = ({ setFavoritesCount }) => {
  useFocusEffect(
    useCallback(() => {
      const loadFavoritesCount = async () => {
        const favorites = await AsyncStorage.getItem("favorites");
        setFavoritesCount(favorites ? JSON.parse(favorites).length : 0);
      };
      loadFavoritesCount();
    }, [])
  );

  return <FavoritesScreen />;
};

const App = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);

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
        options={{
          tabBarBadge: favoritesCount > 0 ? favoritesCount : undefined,
        }}
      >
        {() => <FavoritesWrapper setFavoritesCount={setFavoritesCount} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default App;
