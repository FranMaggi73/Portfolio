import { c as create_ssr_component, v as validate_component, a as subscribe, e as escape, b as add_attribute } from './ssr-hqkys4DV.js';
import { p as pageTitle } from './titleStore-CUcVodpM.js';
import './index2-D1Xrjnhz.js';

var themeChange = {exports: {}};

var hasRequiredThemeChange;

function requireThemeChange () {
	if (hasRequiredThemeChange) return themeChange.exports;
	hasRequiredThemeChange = 1;
	(function (module, exports) {
		function themeToggle(){var toggleEl=document.querySelector("[data-toggle-theme]");var dataKey=toggleEl?toggleEl.getAttribute("data-key"):null;(function(theme=localStorage.getItem(dataKey?dataKey:"theme")){if(localStorage.getItem(dataKey?dataKey:"theme")){document.documentElement.setAttribute("data-theme",theme);if(toggleEl){[...document.querySelectorAll("[data-toggle-theme]")].forEach(el=>{el.classList.add(toggleEl.getAttribute("data-act-class"));});}}})();if(toggleEl){[...document.querySelectorAll("[data-toggle-theme]")].forEach(el=>{el.addEventListener("click",function(){var themesList=el.getAttribute("data-toggle-theme");if(themesList){var themesArray=themesList.split(",");if(document.documentElement.getAttribute("data-theme")==themesArray[0]){if(themesArray.length==1){document.documentElement.removeAttribute("data-theme");localStorage.removeItem(dataKey?dataKey:"theme");}else {document.documentElement.setAttribute("data-theme",themesArray[1]);localStorage.setItem(dataKey?dataKey:"theme",themesArray[1]);}}else {document.documentElement.setAttribute("data-theme",themesArray[0]);localStorage.setItem(dataKey?dataKey:"theme",themesArray[0]);}}[...document.querySelectorAll("[data-toggle-theme]")].forEach(el=>{el.classList.toggle(this.getAttribute("data-act-class"));});});});}}function themeBtn(){var btnEl=document.querySelector("[data-set-theme='']");var dataKey=btnEl?btnEl.getAttribute("data-key"):null;(function(theme=localStorage.getItem(dataKey?dataKey:"theme")){if(theme!=undefined&&theme!=""){if(localStorage.getItem(dataKey?dataKey:"theme")&&localStorage.getItem(dataKey?dataKey:"theme")!=""){document.documentElement.setAttribute("data-theme",theme);var btnEl=document.querySelector("[data-set-theme='"+theme.toString()+"']");if(btnEl){[...document.querySelectorAll("[data-set-theme]")].forEach(el=>{el.classList.remove(el.getAttribute("data-act-class"));});if(btnEl.getAttribute("data-act-class")){btnEl.classList.add(btnEl.getAttribute("data-act-class"));}}}else {var btnEl=document.querySelector("[data-set-theme='']");if(btnEl.getAttribute("data-act-class")){btnEl.classList.add(btnEl.getAttribute("data-act-class"));}}}})();[...document.querySelectorAll("[data-set-theme]")].forEach(el=>{el.addEventListener("click",function(){document.documentElement.setAttribute("data-theme",this.getAttribute("data-set-theme"));localStorage.setItem(dataKey?dataKey:"theme",document.documentElement.getAttribute("data-theme"));[...document.querySelectorAll("[data-set-theme]")].forEach(el=>{el.classList.remove(el.getAttribute("data-act-class"));});if(el.getAttribute("data-act-class")){el.classList.add(el.getAttribute("data-act-class"));}});});}function themeSelect(){var selectEl=document.querySelector("select[data-choose-theme]");var dataKey=selectEl?selectEl.getAttribute("data-key"):null;(function(theme=localStorage.getItem(dataKey?dataKey:"theme")){if(localStorage.getItem(dataKey?dataKey:"theme")){document.documentElement.setAttribute("data-theme",theme);var optionToggler=document.querySelector("select[data-choose-theme] [value='"+theme.toString()+"']");if(optionToggler){[...document.querySelectorAll("select[data-choose-theme] [value='"+theme.toString()+"']")].forEach(el=>{el.selected=true;});}}})();if(selectEl){[...document.querySelectorAll("select[data-choose-theme]")].forEach(el=>{el.addEventListener("change",function(){document.documentElement.setAttribute("data-theme",this.value);localStorage.setItem(dataKey?dataKey:"theme",document.documentElement.getAttribute("data-theme"));[...document.querySelectorAll("select[data-choose-theme] [value='"+localStorage.getItem(dataKey?dataKey:"theme")+"']")].forEach(el=>{el.selected=true;});});});}}function themeChange(attach=true){if(attach===true){document.addEventListener("DOMContentLoaded",function(event){themeToggle();themeSelect();themeBtn();});}else {themeToggle();themeSelect();themeBtn();}}{module.exports={themeChange:themeChange};} 
	} (themeChange));
	return themeChange.exports;
}

requireThemeChange();

const SideBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let drawerChecked = false;
  return `<div class="dropdown mt-2 z-10"><input id="my-drawer-4" type="checkbox" class="drawer-toggle"${add_attribute("checked", drawerChecked, 1)}> <div data-svelte-h="svelte-11pqit2"><label for="my-drawer-4" class="drawer-button btn btn-ghost ml-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></label></div> <div class="drawer-side" data-svelte-h="svelte-rmr6cu"><label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label> <ul class="menu p-2 w-80 h-full bg-base-200 text-base-content"><button id="close-button" class="btn btn-ghost h-14 w-14"><svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"></path></svg></button> <div class="divider m-0 p-0"></div> <li><a href="/">Homepage</a></li> <div><div class="divider m-0 p-0"></div></div> <li><a href="/profile">Profile</a></li> <div><div class="divider m-0 p-0"></div></div> <li><a href="/dinoJump">Dino Jump</a></li> <div><div class="divider m-0 p-0"></div></div> <li><a href="/calculator">Calculator</a></li> <div><div class="divider m-0 p-0"></div></div> <li><a href="/weather">Weather App</a></li></ul></div></div>`;
});
const IconProfile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isAuthenticated } = $$props;
  let { profile } = $$props;
  if ($$props.isAuthenticated === void 0 && $$bindings.isAuthenticated && isAuthenticated !== void 0)
    $$bindings.isAuthenticated(isAuthenticated);
  if ($$props.profile === void 0 && $$bindings.profile && profile !== void 0)
    $$bindings.profile(profile);
  return `${isAuthenticated ? `<div class="dropdown dropdown-end"><div class="flex items-center gap-2 mt-2 mr-4"><span class="cursor-pointer text-xl" tabindex="-1">${escape(profile?.given_name || "")}</span> <button class="btn btn-ghost btn-circle avatar" tabindex="-1"><div class="bg-neutral text-neutral-content rounded-full w-12"><img${add_attribute("src", profile?.picture, 0)} alt="profile"></div></button></div> ${``}</div>` : `<a href="/api/auth/login" class="btn btn-primary mr-4 mt-2" data-svelte-h="svelte-qz5fgj">Log in</a>`}`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $pageTitle, $$unsubscribe_pageTitle;
  $$unsubscribe_pageTitle = subscribe(pageTitle, (value) => $pageTitle = value);
  let { isAuthenticated } = $$props;
  let { profile } = $$props;
  if ($$props.isAuthenticated === void 0 && $$bindings.isAuthenticated && isAuthenticated !== void 0)
    $$bindings.isAuthenticated(isAuthenticated);
  if ($$props.profile === void 0 && $$bindings.profile && profile !== void 0)
    $$bindings.profile(profile);
  $$unsubscribe_pageTitle();
  return `<main class="sticky z-10 top-0 bg-base-100 p-0 m-0"><div class="navbar p-0 m-0">${validate_component(SideBar, "SidelBar").$$render($$result, {}, {}, {})} <div class="flex-1 justify-center"><p class="text-3xl font-semibold mt-2">${escape($pageTitle)}</p></div> ${validate_component(IconProfile, "IconProfile").$$render($$result, { isAuthenticated, profile }, {}, {})}</div> <div class="divider m-0 p-0"></div></main>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let isAuthenticated = data.isAuthenticated;
  let profile = data.userProfile;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Header, "Header").$$render($$result, { isAuthenticated, profile }, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-BlCKEgBG.js.map
