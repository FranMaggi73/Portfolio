<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    export let items: string[];
  
    const dispatch = createEventDispatcher<{ result: string }>();
  
    function spin() {
      const resultRoulete = items[Math.floor(Math.random() * items.length)];
      dispatch('result', resultRoulete);
    }
  </script>
  
  <button class="btn btn-secondary w-full justify-center" on:click={spin}>Spin</button>
  