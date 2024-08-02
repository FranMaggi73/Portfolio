<script lang="ts">
  export let deleteClassificationDialog: HTMLDialogElement;
  export let classificationToDelete: number;
</script>

<dialog bind:this={deleteClassificationDialog} class="modal">
  <div class="modal-box">
    <p class="py-4 text-center text-xl font-extrabold">
      Are you sure you want to<br />delete the classification?
    </p>
    <div class="flex gap-4 justify-center">
      <form method="POST" action="?/deleteClassification">
        <input type="hidden" name="id" value={classificationToDelete} />
        <button class="btn btn-error">Delete</button>
      </form>
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>
