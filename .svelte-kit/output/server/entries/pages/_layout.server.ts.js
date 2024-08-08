import { k as kindeAuthClient } from "../../chunks/KindeSDK.js";
import "../../chunks/index.js";
import "@kinde-oss/kinde-typescript-sdk";
const load = async ({ request }) => {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(
    request
  );
  let userProfile = null;
  if (isAuthenticated) {
    userProfile = await kindeAuthClient.getUser(request);
    const userOrganizations = await kindeAuthClient.getUserOrganizations(
      request
    );
    const permission = await kindeAuthClient.getPermission(
      request,
      "read:profile"
    );
    const permissions = await kindeAuthClient.getPermissions(request);
    const aud = await kindeAuthClient.getClaim(request, "aud");
    try {
      const theme = await kindeAuthClient.getStringFlag(
        request,
        "theme"
      );
      const enable_dark_theme = await kindeAuthClient.getBooleanFlag(
        request,
        "is_dark_mode"
      );
      const user_limit = await kindeAuthClient.getIntegerFlag(
        request,
        "user_limit"
      );
      console.log({
        theme,
        enable_dark_theme,
        user_limit
      });
    } catch (error) {
      console.log("ERROR Flag feature", error);
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
  return {
    isAuthenticated,
    userProfile
  };
};
export {
  load
};
