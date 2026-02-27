import React from "react";

const CountryCard = ({ country }) => {
  return (
    <div className="country-card">
      <img
        src={country.flags?.png || ""}
        alt={country.name?.common}
        className="flag"
      />
      <h2>{country.name?.common || "N/A"}</h2>
      <p>Region: {country.region || "N/A"}</p>
      <p>Population: {country.population?.toLocaleString() || "N/A"}</p>
    </div>
  );
};

export default CountryCard;