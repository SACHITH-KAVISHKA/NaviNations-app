// src/context/FavoriteContext.jsx
import { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (country) => {
    setFavorites((prev) =>
      prev.find((c) => c.name.common === country.name.common)
        ? prev.filter((c) => c.name.common !== country.name.common)
        : [...prev, country]
    );
  };

  const isFavorite = (country) =>
    favorites.some((c) => c.name.common === country.name.common);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
