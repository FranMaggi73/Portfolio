<script lang="ts">
  export let deleteClassifiedWordDialog: HTMLDialogElement;
  export let classifiedWordToDelete: number;
</script>

<dialog bind:this={deleteClassifiedWordDialog} class="modal">
  <div class="modal-box">
    <p class="py-4 text-center text-xl font-extrabold">
      Are you sure you want to delete<br /> the classified word?
    </p>
    <div class="flex gap-4 justify-center">
      <form method="POST" action="?/deleteClassifiedWord">
        <input type="hidden" name="id" value={classifiedWordToDelete} />
        <button class="btn btn-error">Delete</button>
      </form>
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>
