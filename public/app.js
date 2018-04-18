
let allCountries =[];


document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete)

  const selectCountries = document.querySelector('#countries-dropdown');
  selectCountries.addEventListener('change', handleChange);
});



const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
};

const requestComplete = function () {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  allCountries = JSON.parse(jsonString);
  createDropDown(allCountries);
};

const handleChange = function (event) {
  const countryDiv = document.querySelector('#info');
  countryDiv.innerHTML = '';

  const optionInfo = JSON.parse(this.value);
  getStats(countryDiv, optionInfo);


  // console.log(optionInfo["borders"]);
  const borderDiv = document.querySelector('#border-info');
  const neighbours = findNeighbours(optionInfo, allCountries);
  for (country of neighbours) {
    // console.log(country);
    getStats(borderDiv, country)
  };
};


const getStats = function(div, countryOption) {

  const name = document.createElement('li');
  name.textContent = countryOption["name"]

  const pop = document.createElement('li');
  pop.textContent = countryOption["population"]

  const cap = document.createElement('li');
  cap.textContent = countryOption["capital"]

  div.appendChild(name);
  div.appendChild(pop);
  div.appendChild(cap);
};



const findNeighbours = function(selectedCountry, countries){
  const borders = selectedCountry["borders"];
  const borderCountries = [];
  for (border of borders) {
    for (country of countries) {
      if(country["alpha3Code"] === border) {
        borderCountries.push(country);
      };
    };
  };
  // console.log(borderCountries);
  return borderCountries;
};



const createDropDown = function (countries) {
  const select = document.querySelector('#countries-dropdown')
  countries.forEach((country) => {
    const optionObject = document.createElement('option');
    optionObject.textContent = country.name;
    optionObject.value = JSON.stringify(country);
    select.appendChild(optionObject);
    const optionInfo = JSON.parse(optionObject.value);
    // console.log(optionInfo["name"]);

    findNeighbours(optionInfo,countries);
  });
};

const populateList = function (countries) {
  const ul = document.querySelector('#country-list')
  countries.forEach((country) => {
    const li = document.createElement('li');
    li.textContent = country.name;
    ul.appendChild(li);
  });
}
