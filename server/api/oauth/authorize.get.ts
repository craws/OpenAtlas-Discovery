import { authorize } from "@stefanprobst/netlify-cms-oauth-client";

export default defineEventHandler((event) => {
	return authorize(event.node.req, event.node.res);
});
