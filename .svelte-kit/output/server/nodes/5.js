import * as server from '../entries/pages/profile/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/profile/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BpO4-cRV.js","_app/immutable/chunks/scheduler.1RcZ3x8H.js","_app/immutable/chunks/index.ahA2FRjs.js","_app/immutable/chunks/titleStore.D4KGoeeg.js","_app/immutable/chunks/index.CmziHmnV.js"];
export const stylesheets = [];
export const fonts = [];
