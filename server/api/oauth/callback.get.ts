export default defineEventHandler(async (event) => {
	const { callback } = await import("@stefanprobst/netlify-cms-oauth-client");
	return callback(event.node.req, event.node.res);
});
