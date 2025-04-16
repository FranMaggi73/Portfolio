import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'; // <-- Cambio aquí
import { products } from '$lib/types';

export const load: PageServerLoad = ({ params }) => {
  // <-- Y aquí
  const id = Number(params.id);
  if (isNaN(id)) throw error(400, 'ID inválido');

  const product = products.find((p) => p.id === id);
  if (!product) throw error(404, 'Producto no encontrado');
  return { product };
};
