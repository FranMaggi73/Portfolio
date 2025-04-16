<script lang="ts">
  import {
    addToCart,
    updateQuantity,
    cart,
    removeFromCart,
    setQuantity
  } from '../../../store/cart';
  import type { Product } from '$lib/types';
  import { pageTitle } from '../../../store/titleStore';

  export let data: { product: Product };

  $: cartItem = $cart.find((item) => item.id === data.product.id);
  $: currentQuantity = cartItem?.quantity || 0;

  const handleQuantity = (operation: 'increase' | 'decrease') => {
    if (operation === 'increase') {
      if (currentQuantity === 0) {
        addToCart(data.product);
      } else {
        updateQuantity(data.product.id, 'increase');
      }
    } else {
      updateQuantity(data.product.id, 'decrease');
    }
  };

  const handleRemoveAll = () => {
    removeFromCart(data.product.id);
  };

  const handleQuantityInput = (e: Event, id: number) => {
    const input = e.currentTarget as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.slice(0, 2);
    const numValue = parseInt(value) || 0;

    setQuantity(id, numValue, data.product); // Pasar el product como tercer parámetro
    input.value = numValue.toString();
  };

  const handleQuantityBlur = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    if (input.value === '') {
      input.value = '0';
    }
  };

  pageTitle.set(data.product.name);
</script>

<main class="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <article
    class="flex flex-col lg:flex-row gap-8 lg:gap-12 skeleton bg-base-300 rounded-xl p-6 sm:p-8 shadow-lg"
  >
    <div class="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
      <img
        src={data.product.image}
        alt={data.product.name}
        class="w-full max-w-md lg:max-w-none h-auto max-h-96 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div class="flex flex-col gap-4 flex-1">
      <h1 class="text-3xl sm:text-4xl font-bold text-secondary">
        {data.product.name}
      </h1>

      <p class="text-lg sm:text-xl text-primary">
        {data.product.description}
      </p>

      <div class="mt-4 flex items-center gap-4">
        <span class="text-2xl sm:text-3xl font-bold text-accent">
          $ {data.product.price.toLocaleString()}
        </span>
      </div>

      <div class="mt-6 flex gap-4 items-center">
        <div class="join border border-base-300 rounded-lg">
          <button
            class="join-item btn btn-warning px-4"
            on:click={() => handleQuantity('decrease')}
            disabled={currentQuantity === 0}
          >
            -
          </button>
          <input
            type="text"
            class="join-item w-12 text-center bg-base-100"
            value={currentQuantity}
            maxlength="2"
            on:input={(e) => handleQuantityInput(e, data.product.id)}
            on:blur={handleQuantityBlur}
          />
          <button
            class="join-item btn btn-success px-4"
            on:click={() => handleQuantity('increase')}
          >
            +
          </button>
        </div>

        <button on:click={handleRemoveAll} class="btn btn-error"> Remove All </button>
      </div>
    </div>
  </article>
</main>
