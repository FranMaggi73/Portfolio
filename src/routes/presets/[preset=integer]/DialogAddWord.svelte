<script lang="ts">
  import EditIcon from '$lib/icons/EditIcon.svelte';
  export let addWordToPresetDialog: HTMLDialogElement;
  export let presets: { id: number; name: string };
  import type { PageData } from './$types';

  export let data: PageData;

  const { translation, languagesMap } = data;

  let filteredTranslatedWordNames = translation;
  let selectedTranslationId: number | null = null;

  let searchTerm = '';

  $: {
    filteredTranslatedWordNames = translation.filter((word: { word_details: { name: string } }) =>
      word.word_details.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  function handleClick(translationId: number) {
    selectedTranslationId = translationId;
  }
</script>

<dialog bind:this={addWordToPresetDialog} class="modal modal-middle p-12">
  <div class="bg-base-100 w-full h-fit rounded-lg">
    <div class="card-body shadow-lg">
      <div class="flex justify-between items-middle">
        <input
          type="text"
          class="input input-bordered"
          placeholder="Search..."
          bind:value={searchTerm}
        />
        <div>
          <h2 class="text-3xl font-black">{presets.name}</h2>
        </div>
        <form method="dialog">
          <button class="btn btn-error">Close</button>
        </form>
      </div>
    </div>
    <form method="POST" action="?/addWordToPreset" class="mt-4">
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
                <td class="flex gap-4">
                  <button
                    class="btn btn-accent"
                    type="submit"
                    on:click={() => handleClick(word.word_id)}
                  >
                    <EditIcon />
                  </button>
                </td>
              </tr>
              <tr>
                <th class="w-1/12">Translation:</th>
                <td class="w-1/12">{word.translation_details.name}</td>
                <td class="w-1/6">{word.translation_details.pronunciation}</td>
                <td class="w-1/6">{languagesMap[word.translation_details.language_code]}</td>
                <td class="w-1/6">{word.translation_details.gender}</td>
                <td class="w-1/6">{word.translation_details.classification}</td>
              </tr>
              <input type="text" name="preset_id" value={presets.id} class="hidden" />
              <input type="hidden" name="translation_id" value={selectedTranslationId} />
            {/each}
          </tbody>
        </table>
      </div>
    </form>
  </div>
</dialog>
