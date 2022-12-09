export  function fetchCountries(name) {
  const aboutCountries = 'name,capital,population,flags,languages';
    return fetch(
        `https://restcountries.com/v3.1/name/${name}?fields=${aboutCountries}`
      ).then(r => {
        if (!r.ok) {
          throw new Error(r.status);
        }
        return r.json();
      });
    }

   
