<script lang="ts">
  import type { ClassifiedWord, Word } from '$lib/types';

  export let editClassifiedWordDialog: HTMLDialogElement;

  export let selectClassifiedWord: ClassifiedWord;
  export let selectWord: Word;
  export let availableGenders: { id: number; name: string; language_code: string; code: string }[];
  export let classifications: { ID: number; Name: string; Code: string }[];
</script>

<dialog bind:this={editClassifiedWordDialog} class="modal modal-middle">
  <div class="modal-box">
    <div>
      <h1 class="text-center text-xl font-extrabold">Edit Classified Word</h1>
      <form method="POST" action="?/updateClassifiedWord" class="mt-4">
        <div class="flex flex-col">
          <div class="relative input-container">
            <input
              disabled
              type="text"
              class="input input-bordered font-bold text-sm w-full mt-4"
              bind:value={selectClassifiedWord.word}
              placeholder="Search the word"
              required
            />
          </div>
          <input type="hidden" name="word" value={selectWord.id} />

          <input type="hidden" name="id" value={selectClassifiedWord.id} />

          <select
            bind:value={selectClassifiedWord.gender_code}
            class="select select-bordered font-bold w-full mt-4"
            required
          >
            <option disabled selected value>Select the gender</option>
            {#each availableGenders as gender}
              <option value={gender.code} data-id={gender.id}>{gender.name}</option>
            {/each}
          </select>
          <input
            type="hidden"
            name="gender"
            value={availableGenders.find(
              (gender) => gender.code === selectClassifiedWord.gender_code
            )?.id}
          />

          <select
            bind:value={selectClassifiedWord.classification_code}
            class="select select-bordered font-bold w-full mt-4"
            required
          >
            <option disabled selected value>Select the classification</option>
            {#each classifications as classification}
              <option value={classification.Code} data-id={classification.ID}
                >{classification.Name}</option
              >
            {/each}
          </select>
          <input
            type="hidden"
            name="classification"
            value={classifications.find(
              (classification) => classification.Code === selectClassifiedWord.classification_code
            )?.ID}
          />

          <button class="btn btn-primary mt-4 w-full" type="submit">Update</button>
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
