import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { type Actions, redirect, type RequestEvent, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { HttpStatus } from '$lib/types';
import type { PageServerLoad } from './$types';

type Preset = {
  id: number;
  name: string;
};
type Language = {
  id: number;
  name: string;
  code: string;
};

export const load: PageServerLoad = async ({ params, request }) => {
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

  const preset: number = parseInt(params.preset || '1');

  const presetsRequest = await fetch(`${env.API_URL}/api/v1/presets/${preset}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!presetsRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch presets.' });
  }

  const presetResponse = (await presetsRequest.json()) as Preset;

  const languageRequest = await fetch(`${env.API_URL}/api/v1/languages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!languageRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch languages.' });
  }

  const languages = (await languageRequest.json()) as Language[];

  const languagesMap: { [key: string]: string } = languages.reduce(
    (acc, language) => {
      acc[language.code] = language.name;
      return acc;
    },
    {} as { [key: string]: string }
  );

  const translationWordRequest = await fetch(`${env.API_URL}/api/v1/translations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!translationWordRequest.ok) {
    error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to fetch translated words.' });
  }

  const translation = await translationWordRequest.json();

  return {
    isAuthenticated,
    userProfile,
    preset: presetResponse,
    languagesMap,
    translation
  };
};

export const actions: Actions = {
  addWordToPreset: async ({ request }: RequestEvent) => {
    const formData = await request.formData();
    const presetID = Number(formData.get('preset_id'));
    const translationID = Number(formData.get('translation_id'));

    const data = {
      presetID,
      translationID
    };
    console.log(data)

    try {
      const response = await fetch(`${env.API_URL}/api/v1/presets-words`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to add word' });
      }
    } catch (e) {
      error(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'Failed to add word' });
    }
    return {
      success: true
    };
  }
};