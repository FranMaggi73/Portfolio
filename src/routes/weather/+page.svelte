<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { PageData } from './$types';
  import { countries } from '$lib/types';
  import { pageTitle } from '../../store/titleStore';
  pageTitle.set('Weather');

  export let data: PageData;

  type Country = {
    name: string;
    abbreviation: string;
  };

  interface WeatherData {
    name: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      icon: string;
    }>;
  }

  let showOptions = false;
  let result: HTMLElement;
  let selectedCountry: Country['name'] = '';
  let searchTermWord = '';
  let filteredCountryNames: Country[] = [];
  let inputRef: HTMLInputElement;
  let optionsRef: HTMLDivElement;
  let showTitle = true;

  $: {
    filteredCountryNames = countries.filter((word) =>
      word.name.toLowerCase().includes(searchTermWord.toLowerCase())
    );
  }

  const showWeather = (data: WeatherData) => {
    showTitle = false;
    if (typeof window !== 'undefined') {
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
      <div class="flex flex-col items-center">
        <h6 class="font-bold text-xl">Weather in ${name}</h6>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
      </div>
      `;

      result.innerHTML = '';
      result.appendChild(content);
    }
  };

  const kelvinToCentigrade = (temp: number) => {
    return parseInt((temp - 273.15).toFixed(0));
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    location.href = `/weather?country=${searchTermWord}`;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef &&
      !optionsRef.contains(event.target as Node) &&
      !inputRef.contains(event.target as Node)
    ) {
      showOptions = false;
    }
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      result = document.querySelector('.result')!;
      if (data.weather) {
        showWeather(data.weather);
      } else if (data.error) {
        result.innerHTML = `<p>${data.error}</p>`;
      }

      document.addEventListener('mousedown', handleClickOutside);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  });
</script>

<main
  class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"
>
  <section
    class="weather-content bg-neutral sm:w-4/5 md:w-4/5 lg:w-4/5 xl:w-1/2 text-neutral-content p-6 rounded-lg shadow-md"
  >
    {#if showTitle}
      <h1 class="text-2xl mb-4 text-center">Weather</h1>
    {/if}
    <div class="result mb-4"></div>
    <form class="get-weather flex flex-col" on:submit={handleSubmit}>
      <div class="relative input-container mb-4">
        <input
          required
          type="text"
          class="input input-bordered font-bold w-full mt-4"
          bind:this={inputRef}
          bind:value={searchTermWord}
          placeholder={selectedCountry || 'Search the country'}
          on:click={() => (showOptions = !showOptions)}
          on:focus={() => {
            selectedCountry = '';
            searchTermWord = '';
          }}
        />
        {#if showOptions}
          <div
            class="absolute z-10 bg-base-100 text-base-content mt-1 w-full border border-base-300 rounded-md overflow-auto max-h-28"
            bind:this={optionsRef}
          >
            {#each filteredCountryNames as { name }}
              <button
                type="button"
                class="cursor-pointer hover:bg-base-200 p-2 w-full text-left"
                on:click={() => {
                  searchTermWord = name;
                  selectedCountry = name;
                  showOptions = false;
                }}
                >{name}
              </button>
            {/each}
          </div>
        {/if}
      </div>
      <input type="submit" value="Get Weather" class="btn btn-success transition-all" />
    </form>
  </section>
</main>
