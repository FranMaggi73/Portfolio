import { k as kindeAuthClient } from "../../../chunks/KindeSDK.js";
import { r as redirect } from "../../../chunks/index.js";
import "@kinde-oss/kinde-typescript-sdk";
async function load({ request }) {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(
    request
  );
  let userProfile = null;
  if (isAuthenticated) {
    userProfile = await kindeAuthClient.getUser(request);
  }
  if (!isAuthenticated) {
    redirect(307, "/api/auth/login");
  }
  return {
    isAuthenticated,
    userProfile
  };
}
export {
  load
};
