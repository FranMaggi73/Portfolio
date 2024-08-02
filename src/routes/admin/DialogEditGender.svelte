<script lang="ts">
  import type { Genders } from '$lib/types';
  export let languages: { code: string; name: string }[] = [];
  export let gender: Genders;
  export let editGenderDialog: HTMLDialogElement;
</script>

<dialog bind:this={editGenderDialog} class="modal">
  <div class="card-body shadow-lg bg-base-200 rounded-box">
    <h1 class="text-center text-xl font-extrabold">Edit Gender</h1>
    <form method="POST" action="?/updateGender" class="mt-4">
      <div class="flex flex-col">
        <input type="hidden" name="id" id="id" value={gender.id} />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="gender"
          placeholder="Gender"
          id="gender"
          bind:value={gender.name}
        />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="gender_code"
          placeholder="Gender Code (m, f, n)"
          id="gender_code"
          bind:value={gender.code}
        />
        <select
          required
          class="select select-bordered font-bold w-full mt-4"
          name="language_code"
          id="language_code"
          bind:value={gender.language_code}
        >
          <option disabled selected value="">Select the language</option>
          {#each languages as language}
            <option value={language.code}>{language.name}</option>
          {/each}
        </select>
        <button class="btn btn-primary mt-4 w-full" type="submit">Update</button>
      </div>
    </form>
  </div>
</dialog>
