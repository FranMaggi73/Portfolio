<script lang="ts">
  export let createLanguageDialog: HTMLDialogElement;
</script>

<dialog bind:this={createLanguageDialog} class="modal">
  <div class="card-body shadow-lg bg-base-200 modal-box">
    <h1 class="text-center text-xl font-extrabold">Create Language</h1>
    <form method="POST" action="?/createLanguage" class="mt-4">
      <div class="flex flex-col">
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="language"
          placeholder="Create a language"
        />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="language_code"
          placeholder="Create a code (es, en, de)"
        />
        <button class="btn btn-primary mt-4 w-full" type="submit">Create</button>
      </div>
    </form>
  </div>
</dialog>
