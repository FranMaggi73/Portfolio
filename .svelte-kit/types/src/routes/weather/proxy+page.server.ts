// @ts-nocheck
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
export const load = async ({ url, fetch }: Parameters<PageServerLoad>[0]) => {
  const country = url.searchParams.get('country');

  if (!country) {
    return { weather: null };
  }

  const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiId}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw error(500, 'Failed to fetch weather data');
  }

  const data = await response.json();

  if (data.cod === '404') {
    return { error: 'City not found', weather: null };
  }

  return {
    weather: data
  };
};
