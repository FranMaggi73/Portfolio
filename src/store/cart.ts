import { writable } from 'svelte/store';
import type { CartItem, Product } from '$lib/types';

export const cart = writable<CartItem[]>([]);

export function addToCart(product: Product) {
  cart.update((items) => {
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    return [...items];
  });
}
export function setQuantity(id: number, quantity: number, product?: Product) {
  cart.update((items) => {
    const index = items.findIndex((item) => item.id === id);

    if (index === -1 && quantity > 0 && product) {
      // Añadir nuevo item si no existe
      items.push({ ...product, quantity: Math.min(quantity, 99) });
    } else if (index !== -1) {
      // Actualizar cantidad existente
      const newQuantity = Math.min(Math.max(quantity, 0), 99);

      if (newQuantity <= 0) {
        items.splice(index, 1); // Eliminar si cantidad es 0
      } else {
        items[index].quantity = newQuantity;
      }
    }
    return [...items];
  });
}
export function updateQuantity(id: number, operation: 'increase' | 'decrease') {
  cart.update((items) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      if (operation === 'increase') {
        items[index].quantity += 1;
      } else {
        if (items[index].quantity > 1) {
          items[index].quantity -= 1;
        } else {
          items.splice(index, 1);
        }
      }
    }
    return [...items];
  });
}

export function removeFromCart(id: number) {
  cart.update((items) => items.filter((item) => item.id !== id));
}
