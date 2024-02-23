import pino from "pino-http";

const logger = pino();

export default defineEventHandler((event) => {
	if (import.meta.env.PROD) {
		logger(event.node.req, event.node.res);
	}
});
