import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

type ForecastItem = {
  main: {
    temp: number;
  };
};

export const load: PageServerLoad = async ({ url, fetch }) => {
  const country = url.searchParams.get('country');

  if (!country) {
    return { weather: null };
  }

  const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiId}`;
  const forecastApiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiId}`;

  const weatherResponse = await fetch(weatherApiUrl);
  if (!weatherResponse.ok) {
    throw error(500, 'Failed to fetch weather data');
  }

  const weatherData = await weatherResponse.json();

  if (weatherData.cod === '404') {
    return { error: 'City not found', weather: null };
  }

  if (
    weatherData.main.temp === weatherData.main.temp_min &&
    weatherData.main.temp === weatherData.main.temp_max
  ) {
    const forecastResponse = await fetch(forecastApiUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();

      const temps = (forecastData.list as ForecastItem[]).map((item) => item.main.temp);
      weatherData.main.temp_min = Math.min(...temps);
      weatherData.main.temp_max = Math.max(...temps);
    } else {
      weatherData.main.temp_min = weatherData.main.temp;
      weatherData.main.temp_max = weatherData.main.temp;
    }
  }

  return {
    weather: weatherData
  };
};
