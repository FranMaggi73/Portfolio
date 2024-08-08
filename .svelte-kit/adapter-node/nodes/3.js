

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calculator/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.4CXAPyIM.js","_app/immutable/chunks/scheduler.1RcZ3x8H.js","_app/immutable/chunks/index.ahA2FRjs.js","_app/immutable/chunks/titleStore.D4KGoeeg.js","_app/immutable/chunks/index.CmziHmnV.js"];
export const stylesheets = [];
export const fonts = [];
