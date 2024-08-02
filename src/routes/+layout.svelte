<script lang="ts">
  import { themeChange } from 'theme-change';
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import '../app.css';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
  let isAuthenticated = data.isAuthenticated;
  let profile = data.userProfile;

  onMount(() => themeChange());
</script>

<Header {isAuthenticated} {profile} />

<slot />
