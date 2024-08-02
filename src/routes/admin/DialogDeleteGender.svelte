<script lang="ts">
  export let deleteGenderDialog: HTMLDialogElement;
  export let genderToDelete: number;
</script>

<dialog bind:this={deleteGenderDialog} class="modal">
  <div class="modal-box">
    <p class="py-4 text-center text-xl font-extrabold">
      Are you sure you want to delete the gender?
    </p>
    <div class="flex gap-4 justify-center">
      <form method="POST" action="?/deleteGender">
        <input type="hidden" name="id" value={genderToDelete} />
        <button class="btn btn-error">Delete</button>
      </form>
      <form method="dialog">
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>
