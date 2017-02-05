// region import

import fs from 'fs'

// endregion

// region memory

const memory = {
	css: fs.readFileSync(`${__dirname}/../../../node_modules/bootstrap/dist/css/bootstrap.min.css`),
	jsCook: fs.readFileSync(`${__dirname}/../../client/bundle-cook.js`).toString('utf-8').replace(/\\n(\\t)+/g, ''),
	jsUser: fs.readFileSync(`${__dirname}/../../client/bundle-user.js`).toString('utf-8').replace(/\\n(\\t)+/g, '')
}

// combine into one file
memory.htmlCook = fs.readFileSync(`${__dirname}/../../client/cook.html`).toString('utf-8').replace('/*inject-script*/', memory.jsCook).replace('/*inject-style*/', memory.css)
memory.htmlUser = fs.readFileSync(`${__dirname}/../../client/user.html`).toString('utf-8').replace('/*inject-script*/', memory.jsUser).replace('/*inject-style*/', memory.css)

// clean up
delete memory.jsCook
delete memory.jsUser
delete memory.css

// endregion

// region serve

export const htmlCook = {
	status: 200,
	body: memory.htmlCook,
	headers: {
		'Content-Type': 'text/html; charset=utf-8'
	}
}

export const htmlUser = {
	status: 200,
	body: memory.htmlUser,
	headers: {
		'Content-Type': 'text/html; charset=utf-8'
	}
}

// endregion
