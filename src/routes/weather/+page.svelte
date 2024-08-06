<script lang="ts">
  import { onMount } from 'svelte';

  let country = '';
  let result: HTMLElement;
  let form: HTMLFormElement;

  const callAPI = async (country: string) => {
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === '404') {
        showError('Ciudad no encontrada...');
      } else {
        clearHTML();
        showWeather(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showWeather = (data: any) => {
    const { name, main: { temp, temp_min, temp_max }, weather: [arr] } = data;
    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
      <h5>Clima en ${name}</h5>
      <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
      <h2>${degrees}°C</h2>
      <p>Max: ${max}°C</p>
      <p>Min: ${min}°C</p>
    `;

    result.appendChild(content);
  };

  const showError = (message: string) => {
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
      alert.remove();
    }, 3000);
  };

  const kelvinToCentigrade = (temp: number) => {
    return parseInt((temp - 273.15).toFixed(0));
  };

  const clearHTML = () => {
    result.innerHTML = '';
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();


    callAPI(country);
  };

  onMount(() => {
    result = document.querySelector('.result')!;
    form = document.querySelector('.get-weather')!;
  });
</script>

<style global>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
</style>

<main
  class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"
>
<section class="weather-content bg-base-200 p-6 rounded-lg shadow-md w-1/2">
  <h1 class="text-2xl mb-4 text-center">Weather App</h1>
  <div class="result mb-8">
  </div>
  <form class="get-weather flex flex-col" on:submit={handleSubmit}>
    <select id="country" bind:value={country} required class="mb-4 p-3 input-bordered input">
      <option disabled selected value="">Select the country</option>
      <option value="Argentina">Argentina</option>
      <option value="Colombia">Colombia</option>
      <option value="Costa Rica">Costa Rica</option>
      <option value="España">España</option>
      <option value="Estados Unidos">Estados Unidos</option>
      <option value="México">México</option>
      <option value="Perú">Perú</option>
    </select>
    <input type="submit" value="Get Weather" class="btn btn-success transition-all">
  </form>
</section>
</main>