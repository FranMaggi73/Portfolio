<script lang="ts">
  export let deletePresetDialog: HTMLDialogElement;
  export let presetToDelete: number;
</script>

<dialog bind:this={deletePresetDialog} class="modal">
  <div class="modal-box">
    <p class="py-4 text-center text-xl font-extrabold">
      Are you sure you want to<br />delete the preset?
    </p>
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div class="flex gap-4 justify-center">
      <form method="POST" action="?/deletePreset">
        <input type="hidden" name="id" value={presetToDelete} />
        <button class="btn btn-error">Delete</button>
      </form>
    </div>
  </div>
</dialog>
