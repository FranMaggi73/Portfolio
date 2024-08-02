import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { redirect, type RequestEvent } from '@sveltejs/kit';

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

  return {
    isAuthenticated,
    userProfile
  };
}
