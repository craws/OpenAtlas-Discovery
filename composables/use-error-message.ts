interface ErrorMessages {
	notFound: string;
	unknown: string;
}

export function useErrorMessage(error: Ref<Error | null>, messages: ErrorMessages) {
	watch(
		error,
		(error) => {
			if (error != null) {
				if ("statusCode" in error && error.statusCode === 404) {
					throw createError({
						fatal: true,
						statusCode: 404,
						statusMessage: messages.notFound,
					});
				} else {
					throw createError({
						fatal: true,
						statusCode: 500,
						statusMessage: messages.unknown,
					});
				}
			}
		},
		{ immediate: true },
	);
}
