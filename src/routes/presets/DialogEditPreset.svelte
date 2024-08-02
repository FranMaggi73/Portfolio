<script lang="ts">
  import type { Preset } from '$lib/types';
  export let preset: Preset;
  export let editPresetDialog: HTMLDialogElement;
</script>

<dialog bind:this={editPresetDialog} class="modal">
  <div class="card-body shadow-lg bg-base-200 modal-box">
    <h1 class="text-center text-xl font-extrabold">Update Preset</h1>

    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

    <form method="POST" action="?/updatePreset" class="mt-4">
      <div class="flex flex-col">
        <input type="hidden" name="id" id="id" value={preset.id} />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="name"
          id="name"
          placeholder="Edit the preset"
          bind:value={preset.name}
        />
        <button class="btn btn-primary mt-4 w-full" type="submit">Update</button>
      </div>
    </form>
  </div>
</dialog>
