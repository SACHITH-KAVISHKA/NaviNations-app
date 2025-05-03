// src/pages/CountryDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByName } from '../services/api';

const CountryDetails = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const data = await getCountryByName(countryName);
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryName]);

  const formatLanguages = (languages) => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-gray-500">Country not found</div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50'>
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-96">
            <img 
              src={country.flags.svg || country.flags.png} 
              alt={`Flag of ${country.name.common}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl font-extrabold text-white">{country.name.common}</h1>
              <p className="text-xl text-gray-300">{country.name.official}</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Country Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500">Capital:</span>
                    <span className="ml-2 font-semibold text-gray-800">{country.capital && country.capital[0]}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Region:</span>
                    <span className="ml-2 font-semibold text-gray-800">{country.region}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Subregion:</span>
                    <span className="ml-2 font-semibold text-gray-800">{country.subregion || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Population:</span>
                    <span className="ml-2 font-semibold text-gray-800">{country.population.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Languages:</span>
                    <span className="ml-2 font-semibold text-gray-800">{formatLanguages(country.languages)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Currencies:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {country.currencies 
                        ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ')
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Additional Details</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500">Top Level Domain:</span>
                    <span className="ml-2 font-semibold text-gray-800">{country.tld && country.tld.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Calling Code:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {country.idd && country.idd.root 
                        ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`
                        : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Driving Side:</span>
                    <span className="ml-2 font-semibold text-gray-800">{country.car?.side || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Time Zones:</span>
                    <span className="ml-2 font-semibold text-gray-800">{country.timezones && country.timezones.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Border Countries:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {country.borders ? (
                        country.borders.map(border => (
                          <span key={border} className="bg-gray-700 px-3 py-1 rounded-md text-sm text-white">
                            {border}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-800">No bordering countries</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {country.maps && country.maps.googleMaps && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Map</h2>
                <a 
                  href={country.maps.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-colors"
                >
                  View on Map
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
