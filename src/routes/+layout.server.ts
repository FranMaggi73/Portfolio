import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { LayoutServerLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: LayoutServerLoad = async ({ request }) => {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(
    request as unknown as SessionManager
  );
  let userProfile = null;
  if (isAuthenticated) {
    userProfile = await kindeAuthClient.getUser(request as unknown as SessionManager);

    const userOrganizations = await kindeAuthClient.getUserOrganizations(
      request as unknown as SessionManager
    );
    const permission = await kindeAuthClient.getPermission(
      request as unknown as SessionManager,
      'read:profile'
    );
    const permissions = await kindeAuthClient.getPermissions(request as unknown as SessionManager);
    const aud = await kindeAuthClient.getClaim(request as unknown as SessionManager, 'aud');

    try {
      const theme = await kindeAuthClient.getStringFlag(
        request as unknown as SessionManager,
        'theme'
      );
      const enable_dark_theme = await kindeAuthClient.getBooleanFlag(
        request as unknown as SessionManager,
        'is_dark_mode'
      );
      const user_limit = await kindeAuthClient.getIntegerFlag(
        request as unknown as SessionManager,
        'user_limit'
      );

      console.log({
        theme,
        enable_dark_theme,
        user_limit
      });
    } catch (error) {
      console.log('ERROR Flag feature', error);
    }

    console.log({
      isAuthenticated,
      userProfile,
      userOrganizations,
      permission,
      permissions,
      aud
    });
  }

  // const config = await getConfiguration();

  // const apiInstance = new UsersApi(config);

  // const users = await apiInstance.getUsers();
  // console.log('users', users);

  return {
    isAuthenticated,
    userProfile
  };
};
