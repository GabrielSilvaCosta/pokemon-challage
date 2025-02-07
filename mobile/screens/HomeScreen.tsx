import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const handleMessage = async (event) => {
    console.log("Mensagem recebida da WebView:", event.nativeEvent.data);
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "LIKE") {
        const stored = await AsyncStorage.getItem("favorites");
        const favorites = stored ? JSON.parse(stored) : [];

        if (!favorites.find((p) => p.name === data.pokemon.name)) {
          const updatedFavorites = [...favorites, data.pokemon];
          await AsyncStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
          );
          console.log("Favorito salvo:", data.pokemon);
        }
      }
    } catch (error) {
      console.error("Erro ao processar evento da WebView", error);
    }
  };

  return (
    <WebView
      source={{ uri: "https://pokemon-challage.vercel.app/" }}
      onMessage={handleMessage}
      originWhitelist={["*"]}
    />
  );
}
