import { callback } from "@stefanprobst/netlify-cms-oauth-client";

export default defineEventHandler(async (event) => {
	return callback(event.node.req, event.node.res);
});
