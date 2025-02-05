import React from "react";
import { PokemonCardProps } from "../@types/pokemon";
import { LikeIcon, DislikeIcon } from "./Icons";
import { Button } from "./Button";

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onLike,
  onDislike,
}) => {
  const handleLike = () => {
    onLike(pokemon);
    // Este código será adicionado posteriormente no React Native, para enviar a mensagem via WebView
    // if (typeof window !== "undefined" && (window as any).ReactNativeWebView) {
    //   (window as any).ReactNativeWebView.postMessage(
    //     JSON.stringify({ type: "like", pokemon })
    //   );
    // }
  };

  const handleDislike = () => {
    onDislike(pokemon.name);
    // Este código será adicionado posteriormente no React Native, para enviar a mensagem via WebView
    // if (typeof window !== "undefined" && (window as any).ReactNativeWebView) {
    //   (window as any).ReactNativeWebView.postMessage(
    //     JSON.stringify({ type: "dislike", name: pokemon.name })
    //   );
    // }
  };

  return (
    <div className="pokemon-card">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />

      {pokemon.abilities && (
        <p>
          <strong>Habilidades:</strong> {pokemon.abilities.join(", ")}
        </p>
      )}

      <div className="pokemon-actions">
        <Button onClick={handleLike} text="Like" icon={<LikeIcon />} />
        <Button onClick={handleDislike} text="Dislike" icon={<DislikeIcon />} />
      </div>
    </div>
  );
};
