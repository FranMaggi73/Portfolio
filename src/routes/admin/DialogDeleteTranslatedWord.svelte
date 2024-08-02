<script lang="ts">
  export let deleteTranslatedWordDialog: HTMLDialogElement;
  export let translatedWordToDelete: number;
</script>

<dialog bind:this={deleteTranslatedWordDialog} class="modal">
  <div class="modal-box">
    <p class="py-4 text-center text-xl font-extrabold">
      Are you sure you want to delete<br /> the translated word?
    </p>
    <div class="flex gap-4 justify-center">
      <form method="POST" action="?/deleteTranslatedWord">
        <input type="hidden" name="id" value={translatedWordToDelete} />
        <button class="btn btn-error">Delete</button>
      </form>
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>
