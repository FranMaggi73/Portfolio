import { p as parseSearchParamsToObject, k as kindeAuthClient, a as kindeConfiguration } from "../../../../../chunks/KindeSDK.js";
import { e as error, r as redirect } from "../../../../../chunks/index.js";
import "@kinde-oss/kinde-typescript-sdk";
async function handleAuth({ request, params, url: originURL }) {
  const options = parseSearchParamsToObject(originURL.search);
  let url = null;
  switch (params.kindeAuth) {
    case "login":
      url = await kindeAuthClient.login(request, options);
      break;
    case "register":
      url = await kindeAuthClient.register(request, options);
      break;
    case "create_org":
      url = await kindeAuthClient.createOrg(request, options);
      break;
    case "kinde_callback":
      await kindeAuthClient.handleRedirectToApp(request, new URL(request.url));
      throw redirect(302, kindeConfiguration.loginRedirectURL ?? "/");
    case "logout":
      url = await kindeAuthClient.logout(request);
      break;
    default:
      throw error(404, "Not Found");
  }
  throw redirect(302, url.toString());
}
function GET(requestEvents) {
  return handleAuth(requestEvents);
}
export {
  GET
};
