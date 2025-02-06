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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 max-w-xs w-full space-y-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize">
        {pokemon.name}
      </h2>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-full h-48 object-cover rounded-md border border-gray-200 shadow-md"
      />

      {pokemon.categories && (
        <p className="text-gray-700 text-center">
          <strong>Categoria:</strong> {pokemon.categories.join(", ")}
        </p>
      )}

      {pokemon.abilities && (
        <p className="text-gray-700 text-center">
          <strong>Habilidades:</strong> {pokemon.abilities.join(", ")}
        </p>
      )}

      <div className="flex justify-between mt-4 space-x-4">
        <Button
          onClick={handleLike}
          text="Curtir"
          icon={<LikeIcon />}
          className="bg-green-500 hover:bg-green-600 text-white w-full"
        />
        <Button
          onClick={handleDislike}
          text="Descurtir"
          icon={<DislikeIcon />}
          className="bg-red-500 hover:bg-red-600 text-white w-full"
        />
      </div>
    </div>
  );
};
