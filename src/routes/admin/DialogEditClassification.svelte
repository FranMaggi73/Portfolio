<script lang="ts">
  import type { Classification } from '$lib/types';
  export let classification: Classification;
  export let editClassificationDialog: HTMLDialogElement;
</script>

<dialog bind:this={editClassificationDialog} class="modal">
  <div class="card-body shadow-lg bg-base-200 rounded-box">
    <h1 class="text-center text-xl font-extrabold">Update Classification</h1>
    <form method="POST" action="?/updateClassification" class="mt-4">
      <div class="flex flex-col">
        <input type="hidden" name="id" id="id" value={classification.ID} />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="classification"
          id="classification"
          placeholder="Edit a classification"
          bind:value={classification.Name}
        />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="classification_code"
          placeholder="Classification Code (sust, adj)"
          id="classification_code"
          bind:value={classification.Code}
        />
        <button class="btn btn-primary mt-4 w-full" type="submit">Update</button>
      </div>
    </form>
  </div>
</dialog>
