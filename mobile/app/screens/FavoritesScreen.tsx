import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FavoritesContext } from "../context/FavoritesContext";

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const handleDislike = (name) => {
    removeFavorite(name);
    Alert.alert("Descurtido", `Você descurtiu ${name}.`);
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
