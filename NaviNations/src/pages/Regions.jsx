// src/pages/Regions.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCountries, getCountriesByRegion } from '../services/api';
import CountryCard from '../components/CountryCard';

const Regions = () => {
  const { regionName } = useParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(regionName || 'all');
  
  const regions = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        let data;
        
        if (selectedRegion === 'all') {
          data = await getAllCountries();
        } else {
          data = await getCountriesByRegion(selectedRegion);
        }
        
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountries();
  }, [selectedRegion]);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className='bg-white'>
    <div className="container mx-auto px-4 py-8 bg">
      <h1 className="text-3xl font-bold mb-6 text-center font-[poppins] text-gray-900">
        {selectedRegion === 'all' ? 'All Regions' : selectedRegion} Countries
      </h1>
      
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {regions.map(region => (
          <button
            key={region}
            className={`px-4 py-2 rounded-md ${
              selectedRegion === region ? 'bg-blue-500 text-white' : 'bg-blue-800 text-gray-300 hover:bg-blue-900'
            }`}
            onClick={() => handleRegionChange(region)}
          >
            {region === 'all' ? 'All Regions' : region}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Regions;