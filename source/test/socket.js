// region import

import 'babel-polyfill'
import assert from 'assert'
import ssio from 'socket.io-client'

// internal

import server from '../server'

// endregion

// region update

describe('blackbox-websocket-live-update', () => {
	describe('', () => {
		let io = ssio('http://127.0.0.1:8080')
		it('emits an update upon connecting', async () => {
			const result = await new Promise((resolve, reject) =>
				io.on('update', resolve)
			)
			assert.ok(result instanceof Array)
			result.map(order => {
				assert.ok(order.cart instanceof Array)
				assert.ok(typeof order.checkout.to === 'string')
				assert.ok(typeof order.checkout.name === 'string')
				assert.ok(typeof order.checkout.phone === 'string')
			})
		})
	})
})

// endregion

// region status

describe('blackbox-websocket-change-status', () => {
	describe('', () => {

	})
})

// endregion
