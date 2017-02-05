// region import

import request from 'superagent'

// endregion

// region effects

export default {
	placeOrder: ({cart, checkout}, actions) => {
		const data = Object.assign({
			cart
		}, checkout.to === 'custom' ? {checkout} : {
			checkout: {
				name: checkout.name,
				phone: checkout.phone,
				to: checkout.to
			}
		})

		actions.orderStarted()

		request
			.post('/api/v1/order')
			.send(data)
			.then(result => {
				actions.orderSuccessful(result)
				actions.setLocation('/order')
			})
			.catch(actions.orderFailed)
	}
}

// endregion
