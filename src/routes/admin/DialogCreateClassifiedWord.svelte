<script lang="ts">
  import type { ClassifiedWord } from '$lib/types';

  export let createClassifiedWordDialog: HTMLDialogElement;

  export let availableGenders: { id: number; name: string; language_code: string; code: string }[];
  export let classifications: { ID: number; Name: string }[] = [];
  export let selectClassifiedWord: ClassifiedWord;
</script>

<dialog bind:this={createClassifiedWordDialog} class="modal modal-middle">
  <div class="modal-box">
    <div>
      <h1 class="text-center text-xl font-extrabold">Create Classified Word</h1>
      <form method="POST" action="?/createClassifiedWord" class="mt-4">
        <div class="flex flex-col">
          <input
            type="text"
            bind:value={selectClassifiedWord.word}
            class="input input-bordered font-bold text-sm w-full mt-4"
            disabled
          />
          <input
            id="word"
            name="word"
            type="text"
            bind:value={selectClassifiedWord.id}
            hidden
            required
          />
          <select
            id="gender"
            name="gender"
            bind:value={selectClassifiedWord.gender_code}
            class="select select-bordered font-bold w-full mt-4"
            required
          >
            <option disabled selected value="">Select the gender</option>
            {#each availableGenders as gender}
              <option value={gender.id}>{gender.name}</option>
            {/each}
          </select>
          <select
            id="classification"
            name="classification"
            bind:value={selectClassifiedWord.classification}
            class="select select-bordered font-bold w-full mt-4"
            required
          >
            <option disabled selected value="">Select the classification</option>
            {#each classifications as classification}
              <option value={classification.ID}>{classification.Name}</option>
            {/each}
          </select>
          <button class="btn btn-primary mt-4 w-full" type="submit">Create</button>
        </div>
      </form>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-error btn-outline">Close</button>
      </form>
    </div>
  </div>
</dialog>
