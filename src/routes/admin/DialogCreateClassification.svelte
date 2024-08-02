<script lang="ts">
  export let createClassificationDialog: HTMLDialogElement;
</script>

<dialog bind:this={createClassificationDialog} class="modal">
  <div class="card-body shadow-lg bg-base-200 rounded-box">
    <h1 class="text-center text-xl font-extrabold">Create Classifications</h1>
    <form method="POST" action="?/createClassification" class="mt-4">
      <div class="flex flex-col">
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="classification"
          id="classification"
          placeholder="Create a classification"
        />
        <input
          required
          type="text"
          class="input input-bordered font-bold mt-4 text-sm"
          name="classification_code"
          placeholder="Classification Code (sust, adj)"
          id="classification_code"
        />
        <button class="btn btn-primary mt-4 w-full" type="submit">Create</button>
      </div>
    </form>
  </div>
</dialog>
