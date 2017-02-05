// region import

import assert from 'assert'
import 'babel-polyfill'

// endregion

// region serve

import {htmlCook, htmlUser} from '../server/routes/static'

describe('whitebox-serve', () => {
	describe('serves user-site', () => {
		const response = {...htmlUser}

		it('has status 200', () => assert.equal(response.status, 200))
		it('has a body', () => assert.ok(response.body.length >= 1024))
		it('sets the content type', () => assert.equal(response.headers['Content-Type'], 'text/html; charset=utf-8'))
	})

	describe('serves cook-site', () => {
		const response = {...htmlCook}

		it('has status 200', () => assert.equal(response.status, 200))
		it('has a body', () => assert.ok(response.body.length >= 1024))
		it('sets the content type', () => assert.equal(response.headers['Content-Type'], 'text/html; charset=utf-8'))
	})
})

// endregion

// region errors

import {badRequest, internalServerError, notFound} from '../server/routes/error'

describe('whitebox-errors', () => {
	describe('supports 400 Bad Request', () => {
		const response = {...badRequest}

		it('has status 404', () => assert.equal(response.status, 400))
		it('shows the error as body', () => assert.deepEqual(JSON.parse(response.body), {error: 'Bad Request'}))
		it('sets the content type', () => assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8'))
	})

	describe('supports 404 Not Found', () => {
		const response = {...notFound}

		it('has status 404', () => assert.equal(response.status, 404))
		it('shows the error as body', () => assert.deepEqual(JSON.parse(response.body), {error: 'Not Found'}))
		it('sets the content type', () => assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8'))
	})

	describe('supports 500 Internal Server Error', () => {
		const response = {...internalServerError}

		it('has status 404', () => assert.equal(response.status, 500))
		it('shows the error as body', () => assert.deepEqual(JSON.parse(response.body), {error: 'Internal Server Error'}))
		it('sets the content type', () => assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8'))
	})
})

// endregion

// region database

import saveOrder from '../server/routes/save-order'

describe('whitebox-database', () => {
	describe('save order', () => {
		it('rejects missing addresses', async () => {
			try {
				const response = await saveOrder(JSON.stringify({
					cart: [{
						pizzas: ['dank'],
						toppings: {},
						size: 'xl'
					}],
					checkout: {
						to: 'custom'
					}
				}))
				assert.equal(response.status, 400)
				assert.deepEqual(JSON.parse(response.body), {error: 'Bad Request'})
				assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8')
			} catch (error) {
				assert.fail(error)
			}
		})

		it('rejects incomplete addresses', async () => {
			try {
				const response = await saveOrder(JSON.stringify({
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
				}))
				assert.equal(response.status, 400)
				assert.deepEqual(JSON.parse(response.body), {error: 'Bad Request'})
				assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8')
			} catch (error) {
				assert.fail(error)
			}
		})

		it('rejects missing phone/name', async () => {
			try {
				const response = await saveOrder(JSON.stringify({
					cart: [{
						pizzas: ['dank'],
						toppings: {},
						size: 'xl'
					}],
					checkout: {
						to: 'branch',
						phone: '4'
					}
				}))
				assert.equal(response.status, 400)
				assert.deepEqual(JSON.parse(response.body), {error: 'Bad Request'})
				assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8')
			} catch (error) {
				assert.fail(error)
			}
		})

		it('rejects missing carts', async () => {
			try {
				const response = await saveOrder(JSON.stringify({
					cart: [],
					checkout: {
						to: 'branch',
						name: '1',
						phone: '2'
					}
				}))
				assert.equal(response.status, 400)
				assert.deepEqual(JSON.parse(response.body), {error: 'Bad Request'})
				assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8')
			} catch (error) {
				assert.fail(error)
			}
		})

		it('accepts correct orders', async () => {
			try {
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
				const response = await saveOrder(JSON.stringify(order))
				const decoded = JSON.parse(response.body)

				assert.equal(response.status, 200)
				assert.deepEqual(decoded, {
					...order,
					_id: decoded._id,
					status: 'baking',
					time: decoded.time
				})
				assert.equal(response.headers['Content-Type'], 'application/json; charset=utf-8')
			} catch (error) {
				assert.fail(error)
			}
		})
	})
})

// endregion
