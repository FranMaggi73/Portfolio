<script lang="ts">
  import { products, type Product } from '$lib/types';
  import { addToCart, cart, updateQuantity, removeFromCart, setQuantity } from '../../store/cart';
  import { pageTitle } from '../../store/titleStore';

  pageTitle.set('Ecommerce');

  // Función para manejar cambios de cantidad
  const handleQuantity = (product: Product, operation: 'increase' | 'decrease') => {
    if (operation === 'increase') {
      const existingItem = $cart.find((item) => item.id === product.id);
      if (existingItem) {
        updateQuantity(product.id, 'increase');
      } else {
        addToCart(product);
      }
    } else {
      updateQuantity(product.id, 'decrease');
    }
  };

  const handleQuantityInput = (e: Event, product: Product) => {
    const input = e.currentTarget as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.slice(0, 2);
    const numValue = parseInt(value) || 0;

    if (numValue > 0) {
      setQuantity(product.id, numValue, product);
    } else {
      removeFromCart(product.id);
    }
    input.value = numValue.toString();
  };

  const handleQuantityBlur = (e: Event, product: Product) => {
    const input = e.currentTarget as HTMLInputElement;
    if (!input.value) {
      removeFromCart(product.id);
      input.value = '0';
    }
  };

  $: getQuantity = (productId: number) => {
    const item = $cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };
</script>

<main class="flex-1 pb-32 sm:pb-16 w-full max-w-screen-xl mx-auto">
  <section class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {#each products as product}
      <div
        class="card w-full bg-base-200 shadow-xl transition-transform duration-300 hover:scale-105"
      >
        <a href={`/product/${product.id.toString()}`}>
          <figure>
            <img
              src={product.image}
              alt={product.name}
              class="h-48 w-full object-cover rounded-t"
            />
          </figure>
        </a>
        <div class="card-body">
          <h2 class="card-title text-sm justify-center">{product.name}</h2>
          <div class="card-actions justify-end mt-2 w-full">
            <div class="flex items-center gap-1">
              <!-- Precio -->
              <p class="font-bold text-base pr-2">${product.price.toLocaleString()}</p>

              <!-- Controles de cantidad -->
              <div class="join border border-base-300 rounded-lg">
                <button
                  class="join-item btn btn-xs btn-ghost min-w-6"
                  on:click|preventDefault={() => handleQuantity(product, 'decrease')}
                  disabled={getQuantity(product.id) === 0}
                >
                  -
                </button>
                <input
                  type="text"
                  class="join-item w-6 text-center bg-base-100 focus:outline-none"
                  value={getQuantity(product.id)}
                  maxlength="2"
                  on:input={(e) => handleQuantityInput(e, product)}
                  on:blur={(e) => handleQuantityBlur(e, product)}
                />
                <button
                  class="join-item btn btn-xs btn-ghost min-w-6"
                  on:click|preventDefault={() => handleQuantity(product, 'increase')}
                >
                  +
                </button>
              </div>
              <button
                disabled={getQuantity(product.id) === 0}
                on:click|preventDefault={() => removeFromCart(product.id)}
                class="btn btn-xs btn-ghost text-error hover:bg-error/20 ml-1 p-0.5"
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
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </section>
</main>
