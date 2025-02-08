import React, { useContext } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { FavoritesContext } from "../context/FavoritesContext";

const HomeScreen: React.FC = () => {
  const { addFavorite, removeFavorite } = useContext(FavoritesContext)!;

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      if (message.type === "LIKE") {
        if (!message.pokemon) {
          console.error('Objeto "pokemon" ausente na mensagem:', message);
          return;
        }
        addFavorite(message.pokemon);
      } else if (message.type === "DISLIKE") {
        if (!message.name) {
          console.error('Campo "name" ausente na mensagem:', message);
          return;
        }
        removeFavorite(message.name);
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
