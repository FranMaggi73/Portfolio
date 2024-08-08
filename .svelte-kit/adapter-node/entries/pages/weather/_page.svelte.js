import { c as create_ssr_component, o as onDestroy, a as add_attribute } from "../../../chunks/ssr.js";
import { c as countries } from "../../../chunks/types.js";
import { p as pageTitle } from "../../../chunks/titleStore.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  pageTitle.set("Weather");
  let { data } = $$props;
  let searchTermWord = "";
  let inputRef;
  const handleClickOutside = (event) => {
  };
  onDestroy(() => {
    if (typeof window !== "undefined") {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    {
      countries.filter((word) => word.name.toLowerCase().includes(searchTermWord.toLowerCase()));
    }
  }
  return `<main class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"><section class="weather-content bg-neutral sm:w-4/5 md:w-4/5 lg:w-4/5 xl:w-1/2 text-neutral-content p-6 rounded-lg shadow-md">${`<h1 class="text-2xl mb-4 text-center" data-svelte-h="svelte-e9ed1w">Weather</h1>`} <div class="result mb-4"></div> <form class="get-weather flex flex-col"><div class="relative input-container mb-4"><input required type="text" class="input input-bordered font-bold w-full mt-4"${add_attribute("placeholder", "Search the country", 0)}${add_attribute("this", inputRef, 0)}${add_attribute("value", searchTermWord, 0)}> ${``}</div> <input type="submit" value="Get Weather" class="btn btn-success transition-all"></form></section></main>`;
});
export {
  Page as default
};
