<script lang="ts">
  export let languages: { code: string; name: string }[] = [];
  export let createGenderDialog: HTMLDialogElement;
</script>

<dialog bind:this={createGenderDialog} class="modal">
  <div class="card-body shadow-lg bg-base-200 rounded-box">
    <h1 class="text-center text-xl font-extrabold">Create Gender</h1>
    <form method="POST" action="?/createGender" class="mt-4">
      <div class="flex flex-col">
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="gender"
          placeholder="Gender"
          id="gender"
        />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="gender_code"
          placeholder="Gender Code (m, f, n)"
          id="gender_code"
        />
        <select
          required
          class="select select-bordered font-bold w-full mt-4"
          name="language_code"
          id="language_code"
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
</dialog>
