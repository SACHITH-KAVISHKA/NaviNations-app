import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoriteContext';

const CountryCard = ({ country }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    toggleFavorite(country);
  };

  return (
    <Link to={`/country/${country.name.common}`}>
      <div className="card h-full transform transition duration-300 hover:scale-105 shadow-lg rounded-lg relative">
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:scale-110 transition"
        >
          {isFavorite(country) ? (
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          )}
        </button>

        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={country.flags.svg || country.flags.png} 
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-primary px-3 py-1 text-white text-sm font-semibold rounded-tl-lg">
            {country.region}
          </div>
        </div>

        <div className="p-4 bg-gray-100 justify-center text-center space-y-4 rounded-b-lg">
          <h3 className="text-xl font-bold mb-2 text-gray-800">{country.name.common}</h3>
          <div className='flex flex-row text-zinc-500 space-x-4'>
            <div className="flex items-center mb-1">
              <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{country.capital && country.capital[0]}</span>
            </div>
            <div className="flex items-center mb-1">
              <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{country.population.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full font-[poppins] bg-blue-700 p-2 rounded-2xl hover:bg-blue-900 focus:ring-4 focus:ring-blue-300">
              Explore
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
