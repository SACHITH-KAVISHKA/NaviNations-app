// src/pages/Favorites.jsx
import { useFavorites } from '../context/FavoriteContext';
import CountryCard from '../components/CountryCard';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Favorite Countries</h2>
      {favorites.length === 0 ? (
        <p>You have not added any countries to favorites.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
