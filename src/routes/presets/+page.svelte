<script lang="ts">
  import { pageTitle } from '../../store/titleStore';
  import type { PageData } from './$types';
  import EditIcon from '$lib/icons/EditIcon.svelte';
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte';
  import DialogCreatePreset from './DialogCreatePreset.svelte';
  import DialogEditPreset from './DialogEditPreset.svelte';
  import DialogDeletePreset from './DialogDeletePreset.svelte';
  import Goto from '$lib/icons/Goto.svelte';
  import { goto } from '$app/navigation';
  pageTitle.set('Presets');

  export let data: PageData;

  const { presets } = data;

  let filteredPresets = presets;
  let createPresetDialog: HTMLDialogElement;
  let editPresetDialog: HTMLDialogElement;
  let deletePresetDialog: HTMLDialogElement;
  let searchTermClassifications = '';
  let searchTermPresets = '';
  let presetToDelete: number = 0;

  $: selectPreset = { id: 0, name: '' };

  $: {
    filteredPresets = presets.filter((word) =>
      word.name.toLowerCase().includes(searchTermPresets.toLowerCase())
    );
  }
</script>

<main class="flex-1 flex justify-center items-center pb-6 flex-col px-2">
  <div class="gap-4 mt-4 w-full p-4">
    <div class="shadow-lg rounded-box p-2 mt-8">
      <div class="sticky top-0 z-1 p-2 flex justify-between items-center">
        <div class="w-1/3">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Search..."
            bind:value={searchTermClassifications}
          />
        </div>
        <div class="w-1/3 flex justify-center">
          <h2 class="text-3xl font-black">Create Preset</h2>
        </div>
        <div class="w-1/3 flex justify-end mt-2 mr-2">
          <button
            class="btn btn-accent m-1"
            on:click={() => {
              createPresetDialog.showModal();
            }}>Create</button
          >
        </div>
        <DialogCreatePreset bind:createPresetDialog />
      </div>
      <table class="table w-full">
        <thead>
          <tr>
            <th class="w-1/6">ID</th>
            <th>Name</th>
            <th class="w-1/6">Actions</th>
          </tr>
        </thead>
      </table>
      <div class="max-h-96 overflow-y-auto">
        <table class="table w-full">
          <tbody>
            {#each filteredPresets as preset, i}
              <tr class="hover">
                <th class="w-1/6">{preset.id}</th>
                <td>{preset.name}</td>
                <td class="flex gap-4 justify-end">
                  <button
                    class="btn btn-info"
                    on:click={() => {
                      goto(`/presets/${preset.id}`);
                    }}
                    ><Goto />
                  </button>
                  <button
                    class="btn btn-primary"
                    on:click={() => (selectPreset = presets[i])}
                    on:click={() => editPresetDialog.showModal()}
                  >
                    <EditIcon />
                  </button>
                  <DialogEditPreset bind:editPresetDialog preset={selectPreset} />
                  <button
                    class="btn btn-error"
                    on:click={() => {
                      presetToDelete = preset.id;
                    }}
                    on:click={() => deletePresetDialog.show()}
                  >
                    <DeleteIcon />
                  </button>
                  <DialogDeletePreset bind:deletePresetDialog {presetToDelete} />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
