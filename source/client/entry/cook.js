// region import

import {app, html} from 'hyperapp'
import ssio from 'socket.io-client'

// views

import Order from '../components/order'
import Orders from '../views/orders'

// endregion

// region render

app({
	model: {
		orders: []
	},
	effects: {
		setStatus: (state, actions, data) => state.io.emit('set-status', data)
	},
	update: {
		setSocketIO: (state, io) => ({
			...state,
			io
		}),
		update: (state, orders) => ({
			...state,
			orders
		})
	},
	subs: [
		(_, actions) => {
			const io = ssio()
			actions.setSocketIO(io)
			io.on('connect', () => console.info('connected'))
			io.on('update', actions.update)
		}
	],
	view: {
		'/cook': Orders,
		'/cook/detail/:id': (state, actions, {id}) => {
			const order = state.orders.filter(({_id}) => _id === id)[0]

			if (!order) return html`
				<div>Not Found</div>
			`

			if (order.checkout.to === 'branch') order.checkout = {
				city: 'Riedering',
				country: 'Germany',
				name: 'Dank Pizza #42',
				street: 'Gubener Straße 71',
				zipCode: '83081'
			}

			return Order(order)
		}
	}
})

// endregion
