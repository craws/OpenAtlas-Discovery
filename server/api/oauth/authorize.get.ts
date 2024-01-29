export default defineEventHandler(async (event) => {
	const { authorize } = await import("@stefanprobst/netlify-cms-oauth-client");
	return authorize(event.node.req, event.node.res);
});
