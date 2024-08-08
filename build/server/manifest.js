const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["CV.pdf","favicon.ico","favicon.png","img/cactus1.png","img/cactus2.png","img/cloud.png","img/dino.png","img/ground.png"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.Bc4jOH9C.js","app":"_app/immutable/entry/app.C4eAOrQr.js","imports":["_app/immutable/entry/start.Bc4jOH9C.js","_app/immutable/chunks/entry.MDtFfHjd.js","_app/immutable/chunks/scheduler.1RcZ3x8H.js","_app/immutable/chunks/index.CmziHmnV.js","_app/immutable/entry/app.C4eAOrQr.js","_app/immutable/chunks/scheduler.1RcZ3x8H.js","_app/immutable/chunks/index.ahA2FRjs.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-BQJvJr_t.js')),
			__memo(() => import('./chunks/1-CNj3qKk_.js')),
			__memo(() => import('./chunks/2-CI641bsk.js')),
			__memo(() => import('./chunks/3-sTaz3KlO.js')),
			__memo(() => import('./chunks/4-DqNCOSBd.js')),
			__memo(() => import('./chunks/5-DeBHkrh5.js')),
			__memo(() => import('./chunks/6-CDVm8hAg.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/auth/[...kindeAuth]",
				pattern: /^\/api\/auth(?:\/(.*))?\/?$/,
				params: [{"name":"kindeAuth","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DuOV_LEy.js'))
			},
			{
				id: "/api/healthz",
				pattern: /^\/api\/healthz\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-D1fyZ-S5.js'))
			},
			{
				id: "/calculator",
				pattern: /^\/calculator\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/dinoJump",
				pattern: /^\/dinoJump\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/weather",
				pattern: /^\/weather\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
