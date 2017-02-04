import {orders} from '../database'
import {internalServerError} from './error'
export default (body) => new Promise((resolve, reject) => {

	const order = {
		...JSON.parse(body),
		status: 'baking'
	}

	orders.insert(order, (error, savedOrder) => {
		if (error) return resolve(internalServerError)

		console.log(savedOrder)

		return resolve({
			status: 200,
			body: JSON.stringify(order),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		})
	})
})
