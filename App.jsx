import React, { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import SearchBar from "./components/SearchBar";
import RegionFilter from "./components/RegionFilter";
import Loader from "./components/Loader";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    let url = "https://restcountries.com/v3.1/all";

    if (region !== "all") url = `https://restcountries.com/v3.1/region/${region}`;
    if (search.length >= 2) url = `https://restcountries.com/v3.1/name/${search}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch countries");
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [search, region]);

  return (
    <div className="app-container">
      <h1>🌍 Countries Explorer</h1>
      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <RegionFilter region={region} setRegion={setRegion} />
      </div>

      {loading && <Loader />}
      {error && (
        <div className="error">
          Error: {error}{" "}
          <button onClick={fetchCountries}>Retry</button>
        </div>
      )}

      {!loading && !error && countries.length === 0 && (
        <div className="no-results">No results found 😢</div>
      )}

      <div className="countries-list">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default App;