// region 400

export const notFound = {
	status: 404,
	body: JSON.stringify({
		error: 'Not Found'
	}),
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
}
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
