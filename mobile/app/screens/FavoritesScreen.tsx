import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        try {
          const storedFavorites = await AsyncStorage.getItem("favorites");
          setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
        } catch (error) {
          console.error("Erro ao carregar favoritos:", error);
        }
      };
      loadFavorites();
    }, [])
  );

  const handleDislike = async (name) => {
    try {
      const updatedFavorites = favorites.filter((fav) => fav.name !== name);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      Alert.alert("Descurtido", `Você descurtiu ${name}.`);
    } catch (error) {
      console.error("Erro ao descurtir Pokémon:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Categorias: {item.categories.join(", ")}</Text>
      <Text>Habilidades: {item.abilities.join(", ")}</Text>
      <TouchableOpacity
        style={styles.dislikeButton}
        onPress={() => handleDislike(item.name)}
      >
        <Text style={styles.dislikeButtonText}>Descurtir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dislikeButton: {
    marginTop: 10,
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  dislikeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
