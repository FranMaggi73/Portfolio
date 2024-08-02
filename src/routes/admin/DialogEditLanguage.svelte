<script lang="ts">
  import type { Language } from '$lib/types';
  export let language: Language;
  export let editLanguageDialog: HTMLDialogElement;
</script>

<dialog bind:this={editLanguageDialog} class="modal">
  <div class="card-body shadow-lg bg-base-200 rounded-box">
    <h1 class="text-center text-xl font-extrabold">Update Language</h1>
    <form method="POST" action="?/updateLanguage" class="mt-4">
      <div class="flex flex-col">
        <input type="hidden" name="id" id="id" value={language.id} />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="language"
          id="language"
          placeholder="Edit the language"
          bind:value={language.name}
        />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="language_code"
          placeholder="Edit the language code"
          id="language_code"
          bind:value={language.code}
        />
        <button class="btn btn-primary mt-4 w-full" type="submit">Update</button>
      </div>
    </form>
  </div>
</dialog>
