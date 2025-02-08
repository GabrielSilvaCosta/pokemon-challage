import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { FavoritesContext } from "../context/FavoritesContext";
import { RootTabParamList, TabBarIconProps } from "../types/pokemonMobile";

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator: React.FC = () => {
  const { favorites } = useContext(FavoritesContext)!;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }: TabBarIconProps) => {
          let iconName =
            route.name === "Favorites" ? "heart-outline" : "home-outline";
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

export default AppNavigator;
