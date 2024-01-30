import { authorize } from "@stefanprobst/netlify-cms-oauth-client";

export default defineEventHandler(async (event) => {
	return authorize(event.node.req, event.node.res);
});
