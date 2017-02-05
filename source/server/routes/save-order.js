// region import

import {update} from '../socket'
import {badRequest, internalServerError} from './error'
import {orders} from '../database'

// endregion

// region save

export default body => new Promise((resolve, reject) => {

	const order = {
		...JSON.parse(body),
		status: 'baking',
		time: Date.now()
	}

	// missing address?
	if (order.checkout && order.checkout.to === 'custom') {
		const {city, country, name, phone, street, zipCode} = order.checkout
		if (
			!city
			|| !country
			|| !name
			|| !phone
			|| !street
			|| !zipCode
		) return resolve(badRequest)
	}

	// invalid
	if (
		!order.checkout
		|| !['branch', 'custom', 'new'].includes(order.checkout.to)
		|| !order.checkout.name
		|| !order.checkout.phone
	) return resolve(badRequest)

	// empty cart?
	if (
		!order.cart
		|| !order.cart.length
	) return resolve(badRequest)

	return orders.insert(order, (error, savedOrder) => {
		if (error) return resolve(internalServerError)

		update()

		return resolve({
			status: 200,
			body: JSON.stringify(savedOrder),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		})
	})
})

// endregion
