import React from "react";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppNavigator from "./navigation/AppNavigator";

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <AppNavigator />
    </FavoritesProvider>
  );
};

export default App;
