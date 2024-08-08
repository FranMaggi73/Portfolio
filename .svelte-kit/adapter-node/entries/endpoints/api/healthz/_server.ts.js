import { H as HttpStatus } from "../../../../chunks/types.js";
async function GET() {
  return new Response("OK", { status: HttpStatus.OK });
}
export {
  GET
};
