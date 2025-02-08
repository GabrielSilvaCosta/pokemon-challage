import React, { useState, useCallback } from "react";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadFavoritesCount = async () => {
        try {
          const favorites = await AsyncStorage.getItem("favorites");
          setFavoritesCount(favorites ? JSON.parse(favorites).length : 0);
        } catch (error) {
          console.error("Erro ao carregar contagem de favoritos:", error);
        }
      };
      loadFavoritesCount();
    }, [])
  );

  const handleLike = async (pokemon) => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];
      const updatedFavorites = [...parsedFavorites, pokemon];

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavoritesCount(updatedFavorites.length);
    } catch (error) {
      console.error("Erro ao salvar favorito:", error);
    }
  };

  const handleDislike = async (name) => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      const parsedFavorites = favorites ? JSON.parse(favorites) : [];
      const updatedFavorites = parsedFavorites.filter(
        (fav) => fav.name !== name
      );

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavoritesCount(updatedFavorites.length);
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const handleMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      if (message.type === "LIKE") {
        if (!message.pokemon) {
          console.error('Objeto "pokemon" ausente na mensagem:', message);
          return;
        }
        handleLike(message.pokemon);
      } else if (message.type === "DISLIKE") {
        if (!message.name) {
          console.error('Campo "name" ausente na mensagem:', message);
          return;
        }
        handleDislike(message.name);
      }
    } catch (error) {
      console.error("Erro ao processar mensagem da WebView:", error);
    }
  };

  return (
    <WebView
      source={{ uri: "https://pokemon-challage.vercel.app/" }}
      onMessage={handleMessage}
      injectedJavaScript={`
        window.ReactNativeWebView = window.ReactNativeWebView || window;
        true;
      `}
    />
  );
};

export default HomeScreen;
