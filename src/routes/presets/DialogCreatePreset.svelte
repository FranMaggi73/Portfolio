<script lang="ts">
  export let createPresetDialog: HTMLDialogElement;
</script>

<dialog bind:this={createPresetDialog} class="modal">
  <div class="card-body shadow-lg bg-base-200 modal-box">
    <h1 class="text-center text-xl font-extrabold">Create Preset</h1>
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <form method="POST" action="?/createPreset" class="mt-4">
      <div class="flex flex-col">
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="name"
          placeholder="Create a preset"
        />
        <button class="btn btn-primary mt-4 w-full" type="submit">Create</button>
      </div>
    </form>
  </div>
</dialog>
