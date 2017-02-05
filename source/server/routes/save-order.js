import {orders} from '../database'
import {internalServerError} from './error'
export default (body) => new Promise((resolve, reject) => {

	const order = {
		...JSON.parse(body),
		status: 'baking'
	}

	orders.insert(order, (error, savedOrder) => {
		if (error) return resolve(internalServerError)

		return resolve({
			status: 200,
			body: JSON.stringify(savedOrder),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		})
	})
})
