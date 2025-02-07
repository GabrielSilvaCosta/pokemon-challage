import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoriteScreen";
import React from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  const [favoritesCount, setFavoritesCount] = useState(0);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem("favorites");
    setFavoritesCount(stored ? JSON.parse(stored).length : 0);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarBadge: favoritesCount > 0 ? favoritesCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
}
