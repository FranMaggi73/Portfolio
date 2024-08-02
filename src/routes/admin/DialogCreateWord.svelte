<script lang="ts">
  export let languages: { code: string; name: string }[] = [];
  export let createWordDialog: HTMLDialogElement;
</script>

<dialog bind:this={createWordDialog} class="modal modal-middle">
  <div class="modal-box">
    <div>
      <h1 class="text-center text-xl font-extrabold">Create Word</h1>
      <form method="POST" action="?/createWord" class="mt-4">
        <div class="flex flex-col">
          <input
            required
            type="text"
            class="input input-bordered font-bold text-sm mt-4"
            name="word"
            placeholder="Create a word"
            id="word"
          />
          <input
            required
            type="text"
            class="input input-bordered font-bold text-sm mt-4"
            name="pronunciation"
            placeholder="Add the pronunciation"
            id="pronunciation"
          />
          <select
            required
            class="select select-bordered font-bold w-full mt-4"
            name="language"
            id="language"
          >
            <option disabled selected value="">Select the language</option>
            {#each languages as language}
              <option value={language.code}>{language.name}</option>
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
