import { d as private_env } from "./shared-server.js";
import { createKindeServerClient, GrantType } from "@kinde-oss/kinde-typescript-sdk";
const kindeConfiguration = {
  authDomain: private_env.KINDE_ISSUER_URL,
  clientId: private_env.KINDE_CLIENT_ID,
  logoutRedirectURL: private_env.KINDE_POST_LOGOUT_REDIRECT_URL,
  redirectURL: private_env.KINDE_REDIRECT_URL,
  audience: private_env.KINDE_AUDIENCE,
  scope: private_env.KINDE_SCOPE,
  clientSecret: private_env.KINDE_CLIENT_SECRET,
  loginRedirectURL: private_env.KINDE_POST_LOGIN_REDIRECT_URL,
  authUsePKCE: [true, "true"].includes(private_env.KINDE_AUTH_WITH_PKCE)
};
({
  audience: `${private_env.KINDE_ISSUER_URL}/api`,
  clientId: private_env.KINDE_CLIENT_ID,
  clientSecret: private_env.KINDE_CLIENT_SECRET
});
class SessionStorage {
  session;
  constructor() {
    this.session = {};
  }
  getSessionItem(itemKey) {
    try {
      const item = JSON.parse(this.session[itemKey]);
      return item;
    } catch (error) {
      return this.session[itemKey];
    }
  }
  setSessionItem(itemKey, itemValue) {
    this.session[itemKey] = typeof itemValue === "string" ? itemValue : JSON.stringify(itemValue);
  }
  removeSessionItem(itemKey) {
    delete this.session[itemKey];
  }
  destroySession() {
    this.session = {};
  }
}
globalThis.KindeSDK = {
  ...globalThis.KindeSDK ?? {},
  SessionStorage: (globalThis.KindeSDK ?? {}).SessionStorage ?? new SessionStorage()
};
globalThis.KindeSDK.SessionStorage;
const omit = (target, path) => {
  return Object.keys(target).reduce((prev, curr) => {
    if (path.includes(curr)) {
      delete prev[curr];
    }
    return prev;
  }, { ...target });
};
const parseSearchParamsToObject = (search) => {
  const searchParams = new URLSearchParams(search);
  const paramsObject = {};
  for (const param of searchParams.entries()) {
    paramsObject[param[0]] = param[1];
  }
  return paramsObject;
};
const kindeAuthClient = createKindeServerClient(kindeConfiguration.authUsePKCE ? GrantType.PKCE : GrantType.AUTHORIZATION_CODE, omit(kindeConfiguration, kindeConfiguration.authUsePKCE ? ["authUsePKCE", "clientSecret"] : ["authUsePKCE"]));
export {
  kindeConfiguration as a,
  kindeAuthClient as k,
  parseSearchParamsToObject as p
};
