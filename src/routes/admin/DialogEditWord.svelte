<script lang="ts">
  import type { Word } from '$lib/types';
  export let languages: { code: string; name: string }[] = [];
  export let word: Word;
  export let editWordDialog: HTMLDialogElement;
</script>

<dialog bind:this={editWordDialog} class="modal">
  <div class="modal-box">
    <h1 class="text-center text-xl font-extrabold">Edit Word</h1>
    <form method="POST" action="?/updateWord" class="mt-4">
      <div class="flex flex-col">
        <input type="hidden" name="id" id="wordId" value={word.id} />
        <input
          required
          type="text"
          class="input input-bordered font-bold text-sm mt-4"
          name="word"
          placeholder="Edit a word"
          id="wordInput"
          bind:value={word.name}
        />
        <input
          required
          type="text"
          class="input input-bordered font-bold text-sm mt-4"
          name="pronunciation"
          placeholder="Edit the pronunciation"
          id="pronunciation"
          bind:value={word.pronunciation}
        />
        <select
          required
          class="select select-bordered font-bold w-full mt-4"
          name="language"
          id="language"
          bind:value={word.language_code}
        >
          <option disabled selected value>Select the language</option>
          {#each languages as language}
            <option value={language.code}>{language.name}</option>
          {/each}
        </select>
        <button class="btn btn-primary mt-4 w-full" type="submit">Update</button>
      </div>
    </form>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-error btn-outline">Close</button>
      </form>
    </div>
  </div>
</dialog>
