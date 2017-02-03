// region import

import fs from 'fs'

// endregion

// region memory

const memory = {
	js: fs.readFileSync(`${__dirname}/../../client/bundle.js`).toString('utf-8').replace(/\\n(\\t)+/g, ''),
	html: fs.readFileSync(`${__dirname}/../../client/index.html`)
}

// endregion

// region serve

export const js = () => ({
	status: 200,
	body: memory.js,
	headers: {
		'Content-Type': 'application/javascript; charset=utf-8'
	}
})

export const html = () => ({
	status: 200,
	body: memory.html,
	headers: {
		'Content-Type': 'text/html; charset=utf-8'
	}
})

// endregion
