<script lang="ts">
  import { cart, removeFromCart, updateQuantity, setQuantity } from '../../store/cart';
  import type { CartItem } from '$lib/types';

  let dialogElement: HTMLDialogElement;
  export function openModal() {
    dialogElement.showModal();
  }

  const handleQuantity = (itemId: number, operation: 'increase' | 'decrease') => {
    updateQuantity(itemId, operation);
  };

  const handleItemInput = (e: Event, item: CartItem) => {
    const input = e.currentTarget as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.slice(0, 2);
    const numValue = parseInt(value) || 0;

    setQuantity(item.id, numValue, item);
    input.value = numValue.toString();
  };

  const handleItemBlur = (e: Event, item: CartItem) => {
    const input = e.currentTarget as HTMLInputElement;
    if (!input.value) {
      setQuantity(item.id, 0, item);
      input.value = '0';
    }
  };
</script>

<dialog class="modal" bind:this={dialogElement}>
  <form method="dialog" class="modal-box p-0 overflow-hidden max-w-2xl w-[95vw] sm:w-full">
    <!-- Header -->
    <div
      class="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-base-100 sticky top-0 z-10"
    >
      <h3 class="text-lg font-bold">Shopping Cart</h3>
      <button class="btn btn-sm btn-error" type="submit">
        <svg
          class="w-5 h-5"
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
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      </button>
    </div>

    <!-- Cart Content -->
    <div class="p-6 max-h-[60vh] overflow-y-auto">
      {#if $cart.length === 0}
        <p class="text-gray-500 text-center py-4">Your cart is empty</p>
      {:else}
        <ul class="divide-y divide-gray-200">
          {#each $cart as item (item.id)}
            <li
              class="grid grid-cols-12 items-center gap-2 py-3 px-2 hover:bg-base-100 transition-colors"
            >
              <!-- Remove button -->
              <div class="col-span-1 flex justify-center">
                <button
                  type="button"
                  on:click|preventDefault={() => removeFromCart(item.id)}
                  class="btn btn-xs btn-ghost text-error p-1"
                >
                  <svg
                    class="w-4 h-4"
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
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </button>
              </div>

              <!-- Item name -->
              <div class="col-span-5 pr-2">
                <p class="font-semibold truncate text-sm">{item.name}</p>
              </div>

              <!-- Quantity controls -->
              <div class="col-span-3 flex justify-center">
                <div class="join border rounded-lg">
                  <button
                    class="join-item btn btn-xs btn-ghost w-6"
                    on:click|preventDefault={() => handleQuantity(item.id, 'decrease')}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    class="join-item w-6 text-center bg-base-100 focus:outline-none"
                    value={item.quantity}
                    maxlength="2"
                    on:input={(e) => handleItemInput(e, item)}
                    on:blur={(e) => handleItemBlur(e, item)}
                  />
                  <button
                    class="join-item btn btn-xs btn-ghost w-6"
                    on:click|preventDefault={() => handleQuantity(item.id, 'increase')}
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Price -->
              <div class="col-span-3 text-right pr-2">
                <p class="font-bold text-sm whitespace-nowrap">
                  ${(item.quantity * item.price).toLocaleString()}
                </p>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Footer -->
    {#if $cart.length > 0}
      <div
        class="flex justify-between items-center px-4 py-3 border-t border-gray-200 bg-base-100 sticky bottom-0 z-10"
      >
        <p class="font-bold text-lg">
          Total: $ {$cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toLocaleString()}
        </p>
        <button class="btn btn-primary gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
            />
          </svg>
          Checkout
        </button>
      </div>
    {/if}
  </form>
</dialog>
