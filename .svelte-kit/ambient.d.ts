
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const API_URL: string;
	export const KINDE_CLIENT_ID: string;
	export const KINDE_ISSUER_URL: string;
	export const KINDE_POST_LOGIN_REDIRECT_URL: string;
	export const KINDE_POST_LOGOUT_REDIRECT_URL: string;
	export const KINDE_REDIRECT_URL: string;
	export const KINDE_SCOPE: string;
	export const KINDE_AUTH_WITH_PKCE: string;
	export const KDE_FULL_SESSION: string;
	export const LESSOPEN: string;
	export const VSCODE_CWD: string;
	export const npm_package_devDependencies_vitest: string;
	export const GIT_AUTHOR_EMAIL: string;
	export const LANGUAGE: string;
	export const SNAP_COMMON: string;
	export const USER: string;
	export const VSCODE_NLS_CONFIG: string;
	export const npm_config_user_agent: string;
	export const GIO_MODULE_DIR: string;
	export const GIT_EDITOR: string;
	export const GIT_EXEC_PATH: string;
	export const VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
	export const XDG_SEAT: string;
	export const GIT_ASKPASS: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_devDependencies_vite: string;
	export const npm_package_dependencies_node_fetch: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const SNAP_UID: string;
	export const XCURSOR_SIZE: string;
	export const CHROME_DESKTOP: string;
	export const GIT_AUTHOR_DATE: string;
	export const HOME: string;
	export const KDE_APPLICATIONS_AS_SCOPE: string;
	export const SNAP_LIBRARY_PATH: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const DESKTOP_SESSION: string;
	export const GTK_PATH: string;
	export const NVM_BIN: string;
	export const SNAP_USER_DATA: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const GTK_IM_MODULE_FILE: string;
	export const NVM_INC: string;
	export const VSCODE_GIT_EDITOR_MAIN: string;
	export const VSCODE_IPC_HOOK: string;
	export const GIT_AUTHOR_NAME: string;
	export const GTK_MODULES: string;
	export const GTK_RC_FILES: string;
	export const KDE_SESSION_VERSION: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const VSCODE_GIT_EDITOR_NODE: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const GIT_PREFIX: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const npm_package_scripts_check: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const SSH_ASKPASS: string;
	export const SYSTEMD_EXEC_PID: string;
	export const npm_config_engine_strict: string;
	export const SNAP_REVISION: string;
	export const npm_package_devDependencies_daisyui: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_package_devDependencies_typescript: string;
	export const NVM_DIR: string;
	export const VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
	export const IM_CONFIG_PHASE: string;
	export const MANDATORY_PATH: string;
	export const VSCODE_L10N_BUNDLE_LOCATION: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_devDependencies__playwright_test: string;
	export const npm_package_devDependencies_prettier: string;
	export const GTK_IM_MODULE: string;
	export const LOGNAME: string;
	export const npm_package_type: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const SNAP_CONTEXT: string;
	export const _: string;
	export const npm_package_private: string;
	export const npm_package_scripts_check_watch: string;
	export const npm_package_devDependencies__sveltejs_adapter_node: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const DEFAULTS_PATH: string;
	export const SNAP_VERSION: string;
	export const XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: string;
	export const XDG_DATA_DIRS_VSCODE_SNAP_ORIG: string;
	export const XDG_SESSION_CLASS: string;
	export const npm_package_scripts_lint: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const npm_config_registry: string;
	export const GIT_CONFIG_PARAMETERS: string;
	export const USERNAME: string;
	export const XDG_SESSION_ID: string;
	export const SNAP_INSTANCE_NAME: string;
	export const GTK2_RC_FILES: string;
	export const WINDOWPATH: string;
	export const npm_config_node_gyp: string;
	export const PATH: string;
	export const GTK_EXE_PREFIX: string;
	export const SESSION_MANAGER: string;
	export const VSCODE_AMD_ENTRYPOINT: string;
	export const npm_package_name: string;
	export const NODE: string;
	export const BAMF_DESKTOP_FILE_HINT: string;
	export const GDK_BACKEND: string;
	export const SNAP_DATA: string;
	export const XCURSOR_THEME: string;
	export const XDG_RUNTIME_DIR: string;
	export const npm_package_scripts_test_integration: string;
	export const npm_config_frozen_lockfile: string;
	export const DISPLAY: string;
	export const LOCPATH: string;
	export const SSH_ASKPASS_REQUIRE: string;
	export const npm_package_scripts_test_unit: string;
	export const LANG: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_devDependencies_theme_change: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const XAUTHORITY: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XMODIFIERS: string;
	export const npm_package_dependencies__kinde_oss_kinde_auth_sveltekit: string;
	export const npm_lifecycle_script: string;
	export const GSETTINGS_SCHEMA_DIR: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const SNAP_ARCH: string;
	export const SNAP_COOKIE: string;
	export const SNAP_USER_COMMON: string;
	export const npm_package_scripts_test: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_devDependencies__tailwindcss_typography: string;
	export const GDK_PIXBUF_MODULEDIR: string;
	export const SHELL: string;
	export const VSCODE_GIT_COMMAND: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const ELECTRON_RUN_AS_NODE: string;
	export const GDMSESSION: string;
	export const QT_ACCESSIBILITY: string;
	export const npm_package_scripts_build: string;
	export const npm_package_devDependencies_svelte: string;
	export const LESSCLOSE: string;
	export const SNAP_NAME: string;
	export const GDK_PIXBUF_MODULE_FILE: string;
	export const GPG_AGENT_INFO: string;
	export const VSCODE_GIT_EDITOR_EXTRA_ARGS: string;
	export const GIT_PAGER: string;
	export const QT_IM_MODULE: string;
	export const SNAP_LAUNCHER_ARCH_TRIPLET: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const XDG_VTNR: string;
	export const npm_package_scripts_format: string;
	export const LC_ALL: string;
	export const PWD: string;
	export const VSCODE_CLI: string;
	export const npm_execpath: string;
	export const CLUTTER_IM_MODULE: string;
	export const GIT_INDEX_FILE: string;
	export const SNAP_REAL_HOME: string;
	export const VSCODE_CODE_CACHE_PATH: string;
	export const XDG_CONFIG_DIRS: string;
	export const XDG_DATA_DIRS: string;
	export const npm_package_devDependencies_lefthook: string;
	export const SNAP: string;
	export const SNAP_EUID: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_command: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const KDE_SESSION_UID: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const ELECTRON_NO_ATTACH_CONSOLE: string;
	export const VSCODE_PID: string;
	export const npm_package_devDependencies__types_eslint: string;
	export const INIT_CWD: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		API_URL: string;
		KINDE_CLIENT_ID: string;
		KINDE_ISSUER_URL: string;
		KINDE_POST_LOGIN_REDIRECT_URL: string;
		KINDE_POST_LOGOUT_REDIRECT_URL: string;
		KINDE_REDIRECT_URL: string;
		KINDE_SCOPE: string;
		KINDE_AUTH_WITH_PKCE: string;
		KDE_FULL_SESSION: string;
		LESSOPEN: string;
		VSCODE_CWD: string;
		npm_package_devDependencies_vitest: string;
		GIT_AUTHOR_EMAIL: string;
		LANGUAGE: string;
		SNAP_COMMON: string;
		USER: string;
		VSCODE_NLS_CONFIG: string;
		npm_config_user_agent: string;
		GIO_MODULE_DIR: string;
		GIT_EDITOR: string;
		GIT_EXEC_PATH: string;
		VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
		XDG_SEAT: string;
		GIT_ASKPASS: string;
		XDG_SESSION_TYPE: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_devDependencies_vite: string;
		npm_package_dependencies_node_fetch: string;
		npm_node_execpath: string;
		SHLVL: string;
		SNAP_UID: string;
		XCURSOR_SIZE: string;
		CHROME_DESKTOP: string;
		GIT_AUTHOR_DATE: string;
		HOME: string;
		KDE_APPLICATIONS_AS_SCOPE: string;
		SNAP_LIBRARY_PATH: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		DESKTOP_SESSION: string;
		GTK_PATH: string;
		NVM_BIN: string;
		SNAP_USER_DATA: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		GTK_IM_MODULE_FILE: string;
		NVM_INC: string;
		VSCODE_GIT_EDITOR_MAIN: string;
		VSCODE_IPC_HOOK: string;
		GIT_AUTHOR_NAME: string;
		GTK_MODULES: string;
		GTK_RC_FILES: string;
		KDE_SESSION_VERSION: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		VSCODE_GIT_EDITOR_NODE: string;
		npm_package_devDependencies_svelte_check: string;
		GIT_PREFIX: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		npm_package_scripts_check: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		SSH_ASKPASS: string;
		SYSTEMD_EXEC_PID: string;
		npm_config_engine_strict: string;
		SNAP_REVISION: string;
		npm_package_devDependencies_daisyui: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_package_devDependencies_typescript: string;
		NVM_DIR: string;
		VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
		IM_CONFIG_PHASE: string;
		MANDATORY_PATH: string;
		VSCODE_L10N_BUNDLE_LOCATION: string;
		npm_package_scripts_dev: string;
		npm_package_devDependencies__playwright_test: string;
		npm_package_devDependencies_prettier: string;
		GTK_IM_MODULE: string;
		LOGNAME: string;
		npm_package_type: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		SNAP_CONTEXT: string;
		_: string;
		npm_package_private: string;
		npm_package_scripts_check_watch: string;
		npm_package_devDependencies__sveltejs_adapter_node: string;
		npm_package_devDependencies_autoprefixer: string;
		DEFAULTS_PATH: string;
		SNAP_VERSION: string;
		XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: string;
		XDG_DATA_DIRS_VSCODE_SNAP_ORIG: string;
		XDG_SESSION_CLASS: string;
		npm_package_scripts_lint: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		npm_config_registry: string;
		GIT_CONFIG_PARAMETERS: string;
		USERNAME: string;
		XDG_SESSION_ID: string;
		SNAP_INSTANCE_NAME: string;
		GTK2_RC_FILES: string;
		WINDOWPATH: string;
		npm_config_node_gyp: string;
		PATH: string;
		GTK_EXE_PREFIX: string;
		SESSION_MANAGER: string;
		VSCODE_AMD_ENTRYPOINT: string;
		npm_package_name: string;
		NODE: string;
		BAMF_DESKTOP_FILE_HINT: string;
		GDK_BACKEND: string;
		SNAP_DATA: string;
		XCURSOR_THEME: string;
		XDG_RUNTIME_DIR: string;
		npm_package_scripts_test_integration: string;
		npm_config_frozen_lockfile: string;
		DISPLAY: string;
		LOCPATH: string;
		SSH_ASKPASS_REQUIRE: string;
		npm_package_scripts_test_unit: string;
		LANG: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_devDependencies_eslint: string;
		npm_package_devDependencies_theme_change: string;
		VSCODE_GIT_IPC_HANDLE: string;
		XAUTHORITY: string;
		XDG_SESSION_DESKTOP: string;
		XMODIFIERS: string;
		npm_package_dependencies__kinde_oss_kinde_auth_sveltekit: string;
		npm_lifecycle_script: string;
		GSETTINGS_SCHEMA_DIR: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		SNAP_ARCH: string;
		SNAP_COOKIE: string;
		SNAP_USER_COMMON: string;
		npm_package_scripts_test: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_devDependencies__tailwindcss_typography: string;
		GDK_PIXBUF_MODULEDIR: string;
		SHELL: string;
		VSCODE_GIT_COMMAND: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		ELECTRON_RUN_AS_NODE: string;
		GDMSESSION: string;
		QT_ACCESSIBILITY: string;
		npm_package_scripts_build: string;
		npm_package_devDependencies_svelte: string;
		LESSCLOSE: string;
		SNAP_NAME: string;
		GDK_PIXBUF_MODULE_FILE: string;
		GPG_AGENT_INFO: string;
		VSCODE_GIT_EDITOR_EXTRA_ARGS: string;
		GIT_PAGER: string;
		QT_IM_MODULE: string;
		SNAP_LAUNCHER_ARCH_TRIPLET: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		XDG_VTNR: string;
		npm_package_scripts_format: string;
		LC_ALL: string;
		PWD: string;
		VSCODE_CLI: string;
		npm_execpath: string;
		CLUTTER_IM_MODULE: string;
		GIT_INDEX_FILE: string;
		SNAP_REAL_HOME: string;
		VSCODE_CODE_CACHE_PATH: string;
		XDG_CONFIG_DIRS: string;
		XDG_DATA_DIRS: string;
		npm_package_devDependencies_lefthook: string;
		SNAP: string;
		SNAP_EUID: string;
		npm_package_devDependencies_postcss: string;
		npm_command: string;
		PNPM_SCRIPT_SRC_DIR: string;
		KDE_SESSION_UID: string;
		npm_package_scripts_preview: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		ELECTRON_NO_ATTACH_CONSOLE: string;
		VSCODE_PID: string;
		npm_package_devDependencies__types_eslint: string;
		INIT_CWD: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
