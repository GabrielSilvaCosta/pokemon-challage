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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dislikeButton: {
    marginTop: 10,
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 100,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dislikeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
