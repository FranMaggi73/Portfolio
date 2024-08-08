import { c as create_ssr_component, b as add_attribute, e as escape } from './ssr-hqkys4DV.js';
import { p as pageTitle } from './titleStore-CUcVodpM.js';
import './index2-D1Xrjnhz.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  pageTitle.set("Profile");
  let { data } = $$props;
  let { profile = data.userProfile } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.profile === void 0 && $$bindings.profile && profile !== void 0)
    $$bindings.profile(profile);
  return `<main class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"><div class="hero skeleton h-fit w-fit hero-overlay text-center items-center"><div class="hero-content p-0 py-6 sm:py-2 m-3 sm:mx-8 flex-col sm:flex-row"><img class="rounded-box sm:mr-3"${add_attribute("src", profile?.picture, 0)} alt="profile"> <div><div class="text-5xl h-fit w-fit outline font-bold rounded-box p-3 m-3 text-primary">${escape(profile?.given_name)} ${escape(profile?.family_name)}</div> <p class="text-2xl font-bold text-success py-3 my-3">${escape(profile?.email)}</p></div></div></div></main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-OeMgHVsL.js.map
