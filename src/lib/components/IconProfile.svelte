<script lang="ts">
  import ThemeSwitcher from './ThemeSwitcher.svelte';
  import { onMount } from 'svelte';
  import type { UserType } from '@kinde-oss/kinde-auth-sveltekit';
  export let isAuthenticated: boolean;
  export let profile: UserType | null;

  let isOpen = false;

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest('.dropdown')) {
        isOpen = false;
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });
</script>

{#if isAuthenticated}
  <div class="dropdown dropdown-end">
    <div class="flex items-center gap-2 mt-2 mr-4">
      <span
        class="hidden lg:inline cursor-pointer text-xl font-semibold text-base-content"
        tabindex="-1">{profile?.given_name || ''}</span
      >
      <button
        class="btn btn-ghost btn-circle avatar"
        on:click={() => (isOpen = !isOpen)}
        tabindex="-1"
      >
        <div class="bg-neutral text-base-content rounded-full w-12">
          <img src={profile?.picture} alt="profile" />
        </div>
      </button>
    </div>
    {#if isOpen}
      <ul
        tabindex="-1"
        class="menu menu-sm dropdown-content mt-4 z-[1] shadow bg-base-200 mr-2 rounded-box items-center w-36 mx-auto my-auto"
      >
        <li><a href="/profile"> Profile </a></li>
        <li><a href="/api/auth/logout">Logout</a></li>
        <li class="mt-2"><ThemeSwitcher /></li>
      </ul>
    {/if}
  </div>
{:else}
  <a href="/api/auth/login" class="btn btn-primary mr-4 mt-2">Log in</a>
{/if}
