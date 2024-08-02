<script lang="ts">
  import { goto } from '$app/navigation';
  import { pageTitle } from '../../../store/titleStore';
  import type { PageData } from './$types';

  pageTitle.set('Flashcards');

  export let data: PageData;
  const { languages } = data;

  let errorMessage = '';

  let language = languages;

  let selectedKnownLg: string = '';
  let selectedLearnLg: string = '';

  let presets = [
    {
      id: 1,
      text: 'Fruits'
    },
    {
      id: 2,
      text: 'Animals'
    },
    {
      id: 3,
      text: 'Verbs'
    }
  ];

  let preset: number = 0;

  function startGame() {
    const url = `/games/flashcards/presets/${preset}?known=${selectedKnownLg}&learn=${selectedLearnLg}`;
    goto(url);
  }
</script>

<main
  class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"
>
  <div class="text-center">
    <p class="text-xl font-bold mb-4 text-primary">
      Select the options<br />and<br />start the game!
    </p>
    {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {/if}
    <div class="mb-4 flex flex-col sm:flex-row">
      <div class="mb-4">
        Select the native language <select
          bind:value={selectedKnownLg}
          name="known"
          class="select text-center select-info w-2/3 sm:w-4/5"
        >
          <option disabled selected value="">Select a language</option>
          {#each language as word}
            <option value={word.id}>{word.name}</option>
          {/each}
        </select>
      </div>
      <div class="mb-4">
        Select the learning language <select
          bind:value={selectedLearnLg}
          name="learn"
          class="select text-center select-info w-2/3 sm:w-4/5"
        >
          <option disabled selected value="">Select a language</option>
          {#each language as word}
            <option value={word.id}>{word.name}</option>
          {/each}
        </select>
      </div>
      <div class="mb-4">
        Select the thematic <select
          bind:value={preset}
          class="select text-center select-info w-2/3 sm:w-4/5"
        >
          <option disabled selected value={0}>Select a theme</option>
          {#each presets as p}
            <option value={p.id}>{p.text}</option>
          {/each}
        </select>
      </div>
    </div>
    <button
      class="btn btn-primary w-2/3 sm:w-1/2 mt-2 mb-4"
      on:click={startGame}
      disabled={!selectedKnownLg || !selectedLearnLg || !preset}>Start Game</button
    >
  </div>
</main>
