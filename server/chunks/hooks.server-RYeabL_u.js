import './KindeSDK-BQyoWTbi.js';
import './index-CstSBD0C.js';
import './shared-server-BfUoNEXY.js';
import 'node:buffer';
import 'node:crypto';
import 'node:util';
import 'node:http';
import 'node:https';
import 'node:events';

async function sessionHooks({ event }) {
  event.request.setSessionItem = async (itemKey, itemValue) => {
    event.cookies.set(`kinde_${itemKey}`, typeof itemValue === "string" ? itemValue : JSON.stringify(itemValue), {
      path: "/"
    });
  };
  event.request.getSessionItem = (itemKey) => {
    const item = event.cookies.get(`kinde_${itemKey}`);
    if (!item) {
      return item;
    }
    if (/state/.test(itemKey)) {
      return item;
    }
    try {
      const result = JSON.parse(item);
      return result;
    } catch (error) {
      return event.cookies.get(`kinde_${itemKey}`);
    }
  };
  event.request.removeSessionItem = async (itemKey) => {
    return event.cookies.delete(`kinde_${itemKey}`, {
      path: "/"
    });
  };
  event.request.destroySession = async () => {
    event.cookies.getAll().forEach((item) => {
      if (/^kinde_/.test(item.name)) {
        event.cookies.delete(item.name, { path: "/" });
      }
    });
    return;
  };
}
const handle = async ({ event, resolve }) => {
  sessionHooks({ event });
  const response = await resolve(event);
  return response;
};

export { handle };
//# sourceMappingURL=hooks.server-RYeabL_u.js.map
