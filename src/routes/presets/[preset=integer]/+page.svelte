<script lang="ts">
  import { pageTitle } from '../../../store/titleStore';
  import type { PageData } from './$types';
  import DialogAddWordToPreset from './DialogAddWord.svelte';

  pageTitle.set('Preset');

  export let data: PageData;

  const { languagesMap, translation, preset } = data;

  let filteredTranslatedWordNames = translation;

  let addWordToPresetDialog: HTMLDialogElement;
  let searchTermTranslatedWord = '';
  let presets = preset;

  $: {
    filteredTranslatedWordNames = translation.filter((word: { word_details: { name: string } }) =>
      word.word_details.name.toLowerCase().includes(searchTermTranslatedWord.toLowerCase())
    );
  }
</script>

<main class="flex-1 flex justify-center items-center pb-6 flex-col px-2">
  <div class="gap-4 mt-4 w-full p-4">
    <div class="shadow-lg rounded-box p-2 mt-8">
      <div class="sticky top-0 z-1 p-2 flex justify-between items-center">
        <div class="w-1/4">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Search..."
            bind:value={searchTermTranslatedWord}
          />
        </div>
        <div class="flex justify-center">
          <h2 class="text-3xl font-black">{presets.name}</h2>
        </div>
        <div class="w-1/5 flex justify-end mt-2 mr-2">
          <button class="btn btn-accent m-1" on:click={() => addWordToPresetDialog.showModal()}>
            Add Word
          </button>
          <DialogAddWordToPreset bind:addWordToPresetDialog {presets} {data} />
        </div>
      </div>
      <div class="max-h-96 overflow-y-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th class="w-1/12">ID</th>
              <th class="w-1/6">Name</th>
              <th class="w-1/6">Pronunciation</th>
              <th class="w-1/6">Language</th>
              <th class="w-1/6">Gender</th>
              <th class="w-1/6">Classification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredTranslatedWordNames as word}
              <tr class="hover">
                <th class="w-1/12">{word.word_id}</th>
                <td class="w-1/6">{word.word_details.name}</td>
                <td class="w-1/6">{word.word_details.pronunciation}</td>
                <td class="w-1/6">{languagesMap[word.word_details.language_code]}</td>
                <td class="w-1/6">{word.word_details.gender}</td>
                <td class="w-1/6">{word.word_details.classification}</td>
                <td class="flex gap-4"> </td>
              </tr>
              <tr>
                <th class="w-1/12">Translation:</th>
                <td class="w-1/12">{word.translation_details.name}</td>
                <td class="w-1/6">{word.translation_details.pronunciation}</td>
                <td class="w-1/6">{languagesMap[word.translation_details.language_code]}</td>
                <td class="w-1/6">{word.translation_details.gender}</td>
                <td class="w-1/6">{word.translation_details.classification}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
