<script lang="ts">
  export let deleteLanguageDialog: HTMLDialogElement;
  export let languageToDelete: number;
</script>

<dialog bind:this={deleteLanguageDialog} class="modal">
  <div class="modal-box">
    <p class="py-4 text-center text-xl font-extrabold">
      Are you sure you want to<br />delete the language?
    </p>
    <div class="flex gap-4 justify-center">
      <form method="POST" action="?/deleteLanguage">
        <input type="hidden" name="id" value={languageToDelete} />
        <button class="btn btn-error">Delete</button>
      </form>
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>
