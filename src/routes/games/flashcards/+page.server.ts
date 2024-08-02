import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { redirect, type RequestEvent, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { HttpStatus } from '$lib/types';

type Language = {
  id: number;
  name: string;
  code: string;
};

export async function load({ request }: RequestEvent) {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(
    request as unknown as SessionManager
  );
  let userProfile = null;
  if (isAuthenticated) {
    userProfile = await kindeAuthClient.getUser(request as unknown as SessionManager);

    console.log({
      isAuthenticated,
      userProfile
    });
  }
  if (!isAuthenticated) {
    redirect(307, '/api/auth/login');
  }

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
  return {
    isAuthenticated,
    userProfile,
    languages
  };
}
