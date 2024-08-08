import * as server from '../entries/pages/weather/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/weather/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/weather/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BnjzaNmJ.js","_app/immutable/chunks/scheduler.1RcZ3x8H.js","_app/immutable/chunks/index.ahA2FRjs.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/titleStore.D4KGoeeg.js","_app/immutable/chunks/index.CmziHmnV.js"];
export const stylesheets = [];
export const fonts = [];
