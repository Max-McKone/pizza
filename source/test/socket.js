// region import

import 'babel-polyfill'
import assert from 'assert'
import request from 'superagent'
import ssio from 'socket.io-client'

// internal

import server from '../server'

// endregion

// region update

describe('blackbox-websocket-live-update', () => {
	it('emits an update upon connecting', async () => {
		const io = ssio('http://127.0.0.1:8080')
		const result = await new Promise((resolve, reject) =>
			io.on('update', resolve)
		)
		assert.ok(result instanceof Array)
		result.map(order => {
			assert.ok(order.cart instanceof Array)
			assert.ok(typeof order.checkout.to === 'string')
			assert.ok(typeof order.checkout.name === 'string')
			assert.ok(typeof order.checkout.phone === 'string')
			if (order.checkout.to === 'custom') {
				assert.ok(typeof order.checkout.city === 'string')
				assert.ok(typeof order.checkout.country === 'string')
				assert.ok(typeof order.checkout.zipCode === 'string')
				assert.ok(typeof order.checkout.street === 'string')
			}
			assert.ok(order.checkout.to === 'custom' || order.checkout.to === 'branch')
		})
		io.disconnect()
	})
})

// endregion

// region status

describe('blackbox-websocket-change-status', () => {
	it('emits an update after changing status', async () => {
		const io = ssio('http://127.0.0.1:8080')
		const ignore = await new Promise((resolve, reject) =>
			io.on('update', resolve)
		)
		io.emit('set-status', {
			_id: ignore[0]._id,
			status: ignore[0].status === 'custom' ? 'branch' : 'custom'
		})
		const result = await new Promise((resolve, reject) =>
			io.on('update', resolve)
		)

		assert.ok(result[0].status !== ignore.status)
		assert.ok(result instanceof Array)
		result.map(order => {
			assert.ok(order.cart instanceof Array)
			assert.ok(typeof order.checkout.to === 'string')
			assert.ok(typeof order.checkout.name === 'string')
			assert.ok(typeof order.checkout.phone === 'string')
			if (order.checkout.to === 'custom') {
				assert.ok(typeof order.checkout.city === 'string')
				assert.ok(typeof order.checkout.country === 'string')
				assert.ok(typeof order.checkout.zipCode === 'string')
				assert.ok(typeof order.checkout.street === 'string')
			}
			assert.ok(order.checkout.to === 'custom' || order.checkout.to === 'branch')
		})
		io.disconnect()
	})
})

// endregion

// region order

describe('blackbox-websocket-save-order', () => {
	it('emits an update after saving order', async () => {
		const io = ssio('http://127.0.0.1:8080')
		const ignore = await new Promise((resolve, reject) =>
			io.on('update', resolve)
		)
		let httpResult
		request
			.post('http://127.0.0.1:8080/api/v1/order')
			.send({
				cart: [{
					pizzas: ['dank'],
					toppings: {},
					size: 'xl'
				}],
				checkout: {
					to: 'branch',
					name: 'klaus',
					phone: '1234'
				}
			})
			.end((error, result) => httpResult = result)

		const result = await new Promise((resolve, reject) =>
			io.on('update', resolve)
		)

		assert.ok(result[0].status !== ignore.status)
		assert.ok(result instanceof Array)
		result.map(order => {
			assert.ok(order.cart instanceof Array)
			assert.ok(typeof order.checkout.to === 'string')
			assert.ok(typeof order.checkout.name === 'string')
			assert.ok(typeof order.checkout.phone === 'string')
			if (order.checkout.to === 'custom') {
				assert.ok(typeof order.checkout.city === 'string')
				assert.ok(typeof order.checkout.country === 'string')
				assert.ok(typeof order.checkout.zipCode === 'string')
				assert.ok(typeof order.checkout.street === 'string')
			}
			assert.ok(order.checkout.to === 'custom' || order.checkout.to === 'branch')
		})

		const matches = result.filter(({_id}) => _id === httpResult.body._id)

		assert.ok(matches.length === 1)
		io.disconnect()
	})
})

// endregion
