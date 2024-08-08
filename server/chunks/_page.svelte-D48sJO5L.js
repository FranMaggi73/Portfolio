import { c as create_ssr_component, e as escape, d as each, n as null_to_empty } from './ssr-hqkys4DV.js';
import { p as pageTitle } from './titleStore-CUcVodpM.js';
import './index2-D1Xrjnhz.js';

const css = {
  code: ".countdown.svelte-1tnk6pm{position:absolute;width:100%;z-index:4;animation:svelte-1tnk6pm-countdownAnimation 1s infinite}@keyframes svelte-1tnk6pm-countdownAnimation{0%{transform:translate(-50%, -50%) scale(1)}50%{transform:translate(-50%, -50%) scale(1.2)}100%{transform:translate(-50%, -50%) scale(1)}}.container.svelte-1tnk6pm{width:920px;height:280px;position:relative;background:linear-gradient(#b7d6c7, transparent) #ffe2d1;transition:background-color 1s linear;overflow:hidden;border-radius:20px;box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.5);border-width:3px;border-color:#2f2f2f;margin:1rem}.noon.svelte-1tnk6pm{background-color:#ffdcf3}.afternoon.svelte-1tnk6pm{background-color:#ffadad}.night.svelte-1tnk6pm{background-color:#aca8c7}.dino.svelte-1tnk6pm{width:84px;height:84px;position:absolute;bottom:22px;left:42px;z-index:2;background:url('/img/dino.png') repeat-x 0px 0px;background-size:336px 84px;background-position-x:0px}.dino-running.svelte-1tnk6pm{animation:svelte-1tnk6pm-animateDino 0.25s steps(2) infinite}.dino-crashed.svelte-1tnk6pm{background-position-x:-252px}.ground.svelte-1tnk6pm{width:200%;height:42px;position:absolute;bottom:0;left:0;background:url('/img/ground.png') repeat-x 0px 0px;background-size:50% 42px}.cactus.svelte-1tnk6pm{width:46px;height:96px;position:absolute;bottom:16px;z-index:1;background:url('/img/cactus1.png') no-repeat}.cactus2.svelte-1tnk6pm{width:98px;height:66px;background:url('/img/cactus2.png') no-repeat}.cloud.svelte-1tnk6pm{width:92px;height:26px;position:absolute;z-index:0;background:url('/img/cloud.png') no-repeat;background-size:92px 26px}.score.svelte-1tnk6pm{width:100px;height:30px;position:absolute;top:5px;right:15px;z-index:3;color:rgb(247, 123, 123);font-family:Verdana;font-size:30px;font-weight:bold;text-align:right}.game-over.svelte-1tnk6pm{display:none;position:absolute;width:100%;text-align:center;z-index:4;top:50%;left:50%;transform:translate(-50%, -50%)}.start-message.svelte-1tnk6pm{position:absolute;width:100%;text-align:center;z-index:4;top:50%;left:50%;transform:translate(-50%, -50%)}.game-over.active.svelte-1tnk6pm{display:block}@keyframes svelte-1tnk6pm-animateDino{from{background-position-x:-84px}to{background-position-x:-252px}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  pageTitle.set("Dino Jump");
  let dinoPosX = 42;
  let dinoPosY = 22;
  let dinoClass = "dino-running";
  let obstacles = [];
  let clouds = [];
  let countdown = 3;
  $$result.css.add(css);
  return `<main class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"><div class="container svelte-1tnk6pm"><div class="ground bg-repeat-x bg-ground svelte-1tnk6pm"></div> ${`<div class="start-message justify-center text-center text-secondary text-3xl font-bold svelte-1tnk6pm">${`Click to start<br>`}<span class="countdown mt-5 text-3xl text-success justify-center text-center svelte-1tnk6pm">${escape(countdown)}</span></div>`} ${each(obstacles, ({ posX, class: obstacleClass }) => {
    return `<div class="${escape(null_to_empty(`cactus ${obstacleClass}`), true) + " svelte-1tnk6pm"}" style="${"left: " + escape(posX, true) + "px;"}"></div>`;
  })} ${each(clouds, ({ posX, posY }) => {
    return `<div class="cloud svelte-1tnk6pm" style="${"left: " + escape(posX, true) + "px; bottom: " + escape(posY, true) + "px;"}"></div>`;
  })} <div class="${escape(null_to_empty(`dino ${dinoClass}`), true) + " svelte-1tnk6pm"}" style="${"bottom: " + escape(dinoPosY, true) + "px; left: " + escape(dinoPosX, true) + "px;"}"></div> ${``} <div class="${escape(null_to_empty(`game-over text-3xl text-error font-bold ${"hidden"}`), true) + " svelte-1tnk6pm"}">GAME OVER<br><span class="text-success text-3xl font-bold" data-svelte-h="svelte-100kop1">Click to play again</span></div></div> </main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-D48sJO5L.js.map
