// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCountries } from "../services/api";
import CountryCard from "../components/CountryCard";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch countries. Please try again later.");
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries
    .filter((country) => {
      const matchesRegion =
        selectedRegion === "All" || country.region === selectedRegion;
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    })
    .slice(0, 8); // Limit to 8 countries for better UI

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
        <img
          src="https://img.freepik.com/free-photo/global-globalization-world-map-environmental-concervation-concept_53876-124164.jpg?t=st=1746286825~exp=1746290425~hmac=53af6d6723624e6de02bd3e99971a533ede2b758d01ff6c9a93688c1c8f8ecb1&w=1380"
          alt="World Map"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold font-[poppins] text-blue-900 drop-shadow-sm">
          Explore the World with <br />{" "}
          <span className="text-blue-600">NaviNations</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl font-[poppins] text-gray-700 max-w-2xl">
          Dive into rich country profiles and discover population, flags,
          capitals, languages, and more.
        </p>
      </div>

      {/* Countries Section - Removed the problematic div with bg-gray-400 */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8 flex flex-col justify-center mt-0">
          <div className="flex flex-col items-center justify-center mb-12 text-center">
            <div className="w-full max-w-lg mt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a country..."
                  className="w-full pl-10 py-2 rounded-lg bg-gray-100 border-2 border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" // Increased height with py-4
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {regions.map((region) => (
                  <button
                    key={region}
                    className={`px-4 py-2 rounded-md ${
                      selectedRegion === region
                        ? "bg-blue-400 text-white"
                        : "bg-blue-600 text-gray-300 hover:bg-blue-700"
                    }`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="loader">Loading...</div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCountries.map((country) => (
                  <CountryCard key={country.cca3} country={country} />
                ))}
              </div>

              <div className="mt-8 text-center ">
                <Link
                  to="/region/all"
                  className="bg-blue-700 p-1 rounded-4xl hover:bg-blue-900 p-4"
                >
                  Explore All Countries
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
