// region import

import fs from 'fs'

// endregion

// region memory

const memory = {
	js: fs.readFileSync(`${__dirname}/../../client/bundle.js`).toString('utf-8').replace(/\\n(\\t)+/g, ''),
	css: fs.readFileSync(`${__dirname}/../../../node_modules/bootstrap/dist/css/bootstrap.min.css`)
}
memory.html = fs.readFileSync(`${__dirname}/../../client/index.html`).toString('utf-8').replace('/*inject-script*/', memory.js).replace('/*inject-style*/', memory.css)

// endregion

// region serve

export const html = () => ({
	status: 200,
	body: memory.html,
	headers: {
		'Content-Type': 'text/html; charset=utf-8'
	}
})

// endregion
