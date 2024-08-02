import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { type Actions, redirect, type RequestEvent, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { HttpStatus } from '$lib/types';
import type { PageServerLoad } from './$types';

type Preset = {
  id: number;
  name: string;
};

export const load: PageServerLoad = async ({ request }) => {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(
    request as unknown as SessionManager
  );
  let userProfile = null;
  if (isAuthenticated) {
    userProfile = await kindeAuthClient.getUser(request as unknown as SessionManager);
  }
  if (!isAuthenticated) {
    redirect(307, '/api/auth/login');
  }

  /*
  const presetWordRequest = await fetch(`${env.API_URL}/api/v1/presets-words`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!presetWordRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch preset words.' });
  }

  const presetWords = await presetWordRequest.json();
   */

  const presetsRequest = await fetch(`${env.API_URL}/api/v1/presets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!presetsRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch presets.' });
  }

  const presets = (await presetsRequest.json()) as Preset[];

  return {
    isAuthenticated,
    userProfile,
    presets
  };
};

export const actions: Actions = {
  createPreset: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const name = formData.get('name');

    const data = {
      name: name
    };
    try {
      const response = await fetch(`${env.API_URL}/api/v1/presets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create preset.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to create preset.' });
    }

    return {
      success: true
    };
  },

  deletePreset: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));

    try {
      const response = await fetch(`${env.API_URL}/api/v1/presets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to delete preset.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: (e as Error).message });
    }

    return {
      success: true
    };
  },

  updatePreset: async ({ request }: RequestEvent) => {
    const formData = await request.formData();

    const id = Number(formData.get('id'));
    const name = formData.get('name');

    const data = {
      name: name
    };

    try {
      const response = await fetch(`${env.API_URL}/api/v1/presets/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to update preset.' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to update preset.' });
    }

    return {
      success: true
    };
  }
};
