import { k as kindeAuthClient } from './KindeSDK-BQyoWTbi.js';
import './index-CstSBD0C.js';
import './shared-server-BfUoNEXY.js';
import 'node:buffer';
import 'node:crypto';
import 'node:util';
import 'node:http';
import 'node:https';
import 'node:events';

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

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BlCKEgBG.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.DDuKVq4N.js","_app/immutable/chunks/scheduler.1RcZ3x8H.js","_app/immutable/chunks/index.ahA2FRjs.js","_app/immutable/chunks/titleStore.D4KGoeeg.js","_app/immutable/chunks/index.CmziHmnV.js"];
const stylesheets = ["_app/immutable/assets/0.BR-i_lDb.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-BQJvJr_t.js.map
