import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      setFavorites(stored ? JSON.parse(stored) : []);
    };
    loadFavorites();
  }, []);

  const removeFavorite = async (name) => {
    const newFavorites = favorites.filter((p) => p.name !== name);
    setFavorites(newFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Pokémon Favoritos
      </Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderBottomWidth: 1,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeFavorite(item.name)}>
              <Text style={{ color: "red" }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
