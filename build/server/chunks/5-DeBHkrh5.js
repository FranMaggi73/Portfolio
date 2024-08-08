import { k as kindeAuthClient } from './KindeSDK-BQyoWTbi.js';
import { r as redirect } from './index-CstSBD0C.js';
import './shared-server-BfUoNEXY.js';
import 'node:buffer';
import 'node:crypto';
import 'node:util';
import 'node:http';
import 'node:https';
import 'node:events';

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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-OeMgHVsL.js')).default;
const server_id = "src/routes/profile/+page.server.ts";
const imports = ["_app/immutable/nodes/5.BpO4-cRV.js","_app/immutable/chunks/scheduler.1RcZ3x8H.js","_app/immutable/chunks/index.ahA2FRjs.js","_app/immutable/chunks/titleStore.D4KGoeeg.js","_app/immutable/chunks/index.CmziHmnV.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-DeBHkrh5.js.map
