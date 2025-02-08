import React from "react";
import { PokemonCardProps } from "../@types/pokemon";
import { LikeIcon, DislikeIcon } from "./Icons";
import { Button } from "./Button";

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onLike,
  onDislike,
}) => {
  const sendMessageToWebView = (type: string, data: any) => {
    if (typeof window !== "undefined" && (window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({ type, ...data })
      );
    }
  };

  const handleLike = () => {
    onLike(pokemon);
    sendMessageToWebView("LIKE", { pokemon });
  };

  const handleDislike = () => {
    onDislike(pokemon.name);
    sendMessageToWebView("DISLIKE", { name: pokemon.name });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 w-full max-w-sm mx-auto space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 capitalize">
        {pokemon.name}
      </h2>

      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-full h-40 sm:h-48 object-contain rounded-md border border-gray-200 shadow-md"
      />

      {pokemon.categories && (
        <p className="text-gray-700 text-center text-sm sm:text-base">
          <strong>Categoria:</strong> {pokemon.categories.join(", ")}
        </p>
      )}

      {pokemon.abilities && (
        <p className="text-gray-700 text-center text-sm sm:text-base">
          <strong>Habilidades:</strong> {pokemon.abilities.join(", ")}
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={handleLike}
          text="Curtir"
          icon={<LikeIcon />}
          className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 w-full sm:w-auto"
        />
        <Button
          onClick={handleDislike}
          text="Descurtir"
          icon={<DislikeIcon />}
          className="bg-red-500 hover:bg-red-600 focus:ring-red-300 w-full sm:w-auto"
        />
      </div>
    </div>
  );
};
