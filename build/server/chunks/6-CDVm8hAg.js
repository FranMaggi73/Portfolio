import { e as error } from './index-CstSBD0C.js';

const load = async ({ url, fetch }) => {
  const country = url.searchParams.get("country");
  if (!country) {
    return { weather: null };
  }
  const apiId = "41d1d7f5c2475b3a16167b30bc4f265c";
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiId}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw error(500, "Failed to fetch weather data");
  }
  const data = await response.json();
  if (data.cod === "404") {
    return { error: "City not found", weather: null };
  }
  return {
    weather: data
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CEo-mz1J.js')).default;
const server_id = "src/routes/weather/+page.server.ts";
const imports = ["_app/immutable/nodes/6.BnjzaNmJ.js","_app/immutable/chunks/scheduler.1RcZ3x8H.js","_app/immutable/chunks/index.ahA2FRjs.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/titleStore.D4KGoeeg.js","_app/immutable/chunks/index.CmziHmnV.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-CDVm8hAg.js.map
