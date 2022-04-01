import React, {useState, useEffect} from "react";
import './App.css';
import './angle-up.svg'

function App() {

  const API_URL = 'https://restcountries.com/v2/all?fields=name,alpha2Code,region,area';

  const[allCountries, setAllCountries] = useState([]);
  const[filteredCountries, setFilteredCountries] = useState([]);

  useEffect (() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URL);
        const countriesList = await response.json();
        console.log(countriesList);
        
        setAllCountries(countriesList);
        setFilteredCountries(countriesList);
      } catch(err){
        console.log(err.stack);
      }
    }
    
    (async () => await fetchCountries())();
  }, [])

  function filterCountries(filterBy){
    if(filterBy === "Region"){
      let filteredData = allCountries.filter((item) => {
        if(item.region == "Oceania")
          return item;
      })
      setFilteredCountries([...filteredData]);
    }
    if(filterBy === "Area"){
      let filteredData = allCountries.filter((item) => {
        if(item.area < 65300)
          return item;
      })
      setFilteredCountries([...filteredData]);
    }
    if(filterBy === "All"){
      let filteredData = allCountries;
      setFilteredCountries([...filteredData]);
    }
  }

  let sortedData = filteredCountries;
  function sortAsc(){
    sortedData = filteredCountries.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredCountries([...sortedData]);
    console.log(sortedData)
  }
  function sortDesc(){
    sortedData = filteredCountries.sort((a, b) => b.name.localeCompare(a.name))
    setFilteredCountries([...sortedData]);
    console.log(sortedData)
  }
  return (
    <div className="App">
      <div className="heading-div">
        <h1> Country List </h1>
      </div>
  
      <div className="sortButtonDiv">
        <button className="sortButton" onClick={sortAsc}> <svg className="svg-icon asc-svg" viewBox="0 0 20 20">
							<path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
						</svg> </button>
        <button className="sortButton" onClick={sortDesc}> <svg className="svg-icon desc-svg" viewBox="0 0 20 20">
							<path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
						</svg>  </button>
        <select className="sortButton filter" onChange={(e) => {
          // setFilterParam();
          filterCountries(e.target.value);
       }}>
          <option disabled value="Filter by:">Filter by</option>
          <option value="All">All</option>
          <option value="Region">Region (Oceania)</option>
          <option value="Area">Area (smaller then LT)</option>
        </select>
      </div>

      <div className="centered">
      <section className="cards">
      {filteredCountries.map(country => (
                    <arcticle key={country.name+country.area} className="card">
                      <img className="flag" src={`https://flagcdn.com/h80/${country.alpha2Code.toLowerCase()}.png`} alt="flag"/> <br />
                      <div className="cardText">
                        <span className="countryData">{country.name}</span> <br />
                        Region: <span className="countryData">{country.region}</span>  <br/>
                        Area: <span className="countryData">{country.area}</span>  km²
                      </div>
                    </arcticle>
                ))}
      </section>
            
        </div>
    </div>

  );
}

export default App;
