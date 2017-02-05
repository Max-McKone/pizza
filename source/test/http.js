// region import

import 'babel-polyfill'
import assert from 'assert'
import request from 'superagent'

// internal

import server from '../server'

// endregion

// region serve

describe('blackbox-serve', () => {
	describe('serves user-site', () => {
		it ('has status 200', async () => {
			const response = await request
				.get('http://127.0.0.1:8080')
			assert.equal(response.status, 200)
		})

		it ('has a body', async () => {
			const response = await request
				.get('http://127.0.0.1:8080')
			assert.ok(response.text.length >= 1024)
		})

		it ('sets the content-type', async () => {
			const response = await request
				.get('http://127.0.0.1:8080')
			assert.equal(response.headers['content-type'], 'text/html; charset=utf-8')
		})
	})

	describe('serves cook-site', async () => {
		it ('has status 200', async () => {
			const response = await request
				.get('http://127.0.0.1:8080/cook')
			assert.equal(response.status, 200)
		})

		it ('has a body', async () => {
			const response = await request
				.get('http://127.0.0.1:8080/cook')
			assert.ok(response.text.length >= 1024)
		})

		it ('sets the content-type', async () => {
			const response = await request
				.get('http://127.0.0.1:8080/cook')
			assert.equal(response.headers['content-type'], 'text/html; charset=utf-8')
		})
	})
})

// endregion

// region errors

describe('blackbox-errors', () => {
	describe('supports 404 Not Found', async () => {
		it ('has status 404', async () => {
			const response = await request
				.get('http://127.0.0.1:8080/invalid')
				.catch(a => a)
			assert.equal(response.response.status, 404)
		})

		it ('shows the error as body', async () => {
			const response = await request
				.get('http://127.0.0.1:8080/invalid')
				.catch(a => a)
			assert.deepEqual(response.response.body, {
				error: 'Not Found'
			})
		})

		it ('sets the content-type', async () => {
			const response = await request
				.get('http://127.0.0.1:8080/invalid')
				.catch(a => a)
			assert.equal(response.response.headers['content-type'], 'application/json; charset=utf-8')
		})
	})
})

// endregion

// region database

describe('blackbox-database', () => {
	describe('save-order', () => {
		it('rejects missing addresses', async () => {
			const response = await request
				.post('http://127.0.0.1:8080/api/v1/order')
				.send({
					cart: [{
						pizzas: ['dank'],
						toppings: {},
						size: 'xl'
					}],
					checkout: {
						to: 'custom'
					}
				})
				.catch(a => a)
			assert.equal(response.response.status, 400)
			assert.deepEqual(response.response.body, {error: 'Bad Request'})
			assert.equal(response.response.headers['content-type'], 'application/json; charset=utf-8')
		})

		it('rejects incomplete addresses', async () => {
			const response = await request
				.post('http://127.0.0.1:8080/api/v1/order')
				.send({
					cart: [{
						pizzas: ['dank'],
						toppings: {},
						size: 'xl'
					}],
					checkout: {
						to: 'custom',
						city: '1',
						country: '2',
						name: '3',
						phone: '4',
						street: '5'
					}
				})
				.catch(a => a)
			assert.equal(response.response.status, 400)
			assert.deepEqual(response.response.body, {error: 'Bad Request'})
			assert.equal(response.response.headers['content-type'], 'application/json; charset=utf-8')
		})

		it('rejects missing phone/name', async () => {
			const response = await request
				.post('http://127.0.0.1:8080/api/v1/order')
				.send({
					cart: [{
						pizzas: ['dank'],
						toppings: {},
						size: 'xl'
					}],
					checkout: {
						to: 'branch',
						phone: '4'
					}
				})
				.catch(a => a)
			assert.equal(response.response.status, 400)
			assert.deepEqual(response.response.body, {error: 'Bad Request'})
			assert.equal(response.response.headers['content-type'], 'application/json; charset=utf-8')
		})

		it('rejects missing carts', async () => {
			const response = await request
				.post('http://127.0.0.1:8080/api/v1/order')
				.send({
					cart: [],
					checkout: {
						to: 'branch',
						name: '1',
						phone: '2'
					}
				})
				.catch(a => a)
			assert.equal(response.response.status, 400)
			assert.deepEqual(response.response.body, {error: 'Bad Request'})
			assert.equal(response.response.headers['content-type'], 'application/json; charset=utf-8')
		})

		it('accepts correct orders', async () => {
			const order = {
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
			}
			const response = await request
				.post('http://127.0.0.1:8080/api/v1/order')
				.send(order)

			assert.equal(response.status, 200)
			assert.deepEqual(response.body, {...order, _id: response.body._id, status: 'baking'})
			assert.equal(response.headers['content-type'], 'application/json; charset=utf-8')
		})
	})
})

// endregion
