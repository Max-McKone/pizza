// region 400

export const badRequest = {
	status: 400,
	body: JSON.stringify({
		error: 'Bad Request'
	}),
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
}

export const notFound = {
	status: 404,
	body: JSON.stringify({
		error: 'Not Found'
	}),
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
}

// endregion

// region 500

export const internalServerError = {
	status: 500,
	body: JSON.stringify({
		error: 'Internal Server Error'
	}),
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
}

// endregion
