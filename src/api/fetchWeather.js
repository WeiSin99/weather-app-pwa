const URL = 'https://api.weatherapi.com/v1/current.json';

const fetchWeather = async (query) => {
  try {
    const response = await fetch(
      `${URL}?key=${process.env.REACT_APP_WEATHER_API_KEY}&aqi=yes&q=${query}`
    );
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

export { fetchWeather };
