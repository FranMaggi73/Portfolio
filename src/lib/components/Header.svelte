<script lang="ts">
  import SidelBar from '$lib/components/SideBar.svelte';
  import type { UserType } from '@kinde-oss/kinde-auth-sveltekit';
  import { pageTitle } from '../../store/titleStore';
  import IconProfile from './IconProfile.svelte';
  export let isAuthenticated: boolean;
  export let profile: UserType | null;
</script>

<main class="sticky z-10 top-0 bg-base-100 p-0 m-0">
  <div class="navbar p-0 m-0">
    <SidelBar />
    <div class="flex-1 justify-center">
      <p class="text-xl font-semibold mt-2">{$pageTitle}</p>
    </div>
    <IconProfile {isAuthenticated} {profile} />
  </div>
  <div class="divider m-0 p-0" />
</main>
