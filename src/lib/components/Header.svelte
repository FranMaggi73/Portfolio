<script lang="ts">
  import SidelBar from '$lib/components/SideBar.svelte';
  import CartModal from '$lib/components/CartModal.svelte';
  import { page } from '$app/stores';
  import { cart } from '../../store/cart';
  import type { UserType } from '@kinde-oss/kinde-auth-sveltekit';
  import { pageTitle } from '../../store/titleStore';
  import IconProfile from './IconProfile.svelte';

  export let isAuthenticated: boolean;
  export let profile: UserType | null;

  let cartModal: CartModal;

  $: showCart =
    $page.url.pathname.startsWith('/product') || $page.url.pathname.startsWith('/ecommerce');
  $: totalItems = $cart.reduce((acc, item) => acc + item.quantity, 0);
</script>

<main class="sticky z-10 top-0 bg-base-100 p-0 m-0">
  <div class="navbar p-0 m-0 relative">
    <div class="flex-1 flex items-center">
      <SidelBar />
    </div>

    <div class="absolute left-1/2 -translate-x-1/2 hidden sm:block">
      <p class="text-3xl font-semibold">{$pageTitle}</p>
    </div>

    <div class="flex-1 flex items-center justify-end gap-4">
      {#if showCart}
        <button class="btn btn-ghost relative" on:click={() => cartModal.openModal()}>
          <svg
            class="w-6 h-6 text-neutral"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
          {#if totalItems >= 0}
            <div class="indicator">
              <span class=" indicator-item badge-secondary badge absolute -top-1 -right-1"
                >{totalItems}</span
              >
            </div>
          {/if}
        </button>
      {/if}
      <IconProfile {isAuthenticated} {profile} />
    </div>
  </div>

  <div class="divider m-0 p-0" />

  {#if showCart}
    <CartModal bind:this={cartModal} />
  {/if}
</main>
