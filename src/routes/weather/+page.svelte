<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let country = '';
  let result: HTMLElement;

  const showWeather = (data: any) => {
    const {
      name,
      main: { temp, temp_min, temp_max },
      weather: [arr]
    } = data;
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

    result.innerHTML = '';
    result.appendChild(content);
  };

  const kelvinToCentigrade = (temp: number) => {
    return parseInt((temp - 273.15).toFixed(0));
  };

  const handleSubmit = (event: Event) => {
    location.href = `/weather?country=${country}`;
  };

  onMount(() => {
    result = document.querySelector('.result')!;
    if (data.weather) {
      showWeather(data.weather);
    } else if (data.error) {
      result.innerHTML = `<p class="alert-message">${data.error}</p>`;
    }
  });
</script>

<main
  class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"
>
  <section class="weather-content bg-base-200 p-6 rounded-lg shadow-md w-1/2">
    <h1 class="text-2xl mb-4 text-center">Weather App</h1>
    <div class="result mb-8"></div>
    <form class="get-weather flex flex-col" method="GET">
      <select
        id="country"
        name="country"
        bind:value={country}
        required
        class="mb-4 p-3 input-bordered input"
      >
        <option disabled selected value="">Select the country</option>
        <option value="Argentina">Argentina</option>
        <option value="Colombia">Colombia</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="España">España</option>
        <option value="Estados Unidos">Estados Unidos</option>
        <option value="México">México</option>
        <option value="Perú">Perú</option>
      </select>
      <input
        type="submit"
        value="Get Weather"
        on:click={handleSubmit}
        class="btn btn-success transition-all"
      />
    </form>
  </section>
</main>

<style global>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
</style>
