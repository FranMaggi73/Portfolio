<script lang="ts">
  export let deleteWordDialog: HTMLDialogElement;
  export let wordToDelete: number;
</script>

<dialog bind:this={deleteWordDialog} class="modal">
  <div class="modal-box">
    <p class="py-4 text-center text-xl font-extrabold">Are you sure you want to delete the word?</p>
    <div class="flex gap-4 justify-center">
      <form method="POST" action="?/deleteWord">
        <input type="hidden" name="id" value={wordToDelete} />
        <button class="btn btn-error">Delete</button>
      </form>
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>
