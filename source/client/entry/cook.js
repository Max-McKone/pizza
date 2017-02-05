// region import

import ssio from 'socket.io-client'
import {app, html} from 'hyperapp'

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
		}),
		tick: s => s
	},
	subs: [
		(_, actions) => {
			const io = ssio()
			actions.setSocketIO(io)
			io.on('connect', () => console.info('connected'))
			io.on('update', actions.update)
		},
		(_, actions) =>
			setInterval(() => actions.tick(), 1000)
	],
	view: {
		'/cook': Orders,
		'/cook/detail/:id': (state, actions, {id}) => {
			const order = state.orders.filter(({_id}) => _id === id)[0]

			if (!order) return html`
				<div>Not Found</div>
			`

			return Order({
				...order,
				checkout: {
					street: 'Gubener Straße 71',
					zipCode: '83081',
					city: 'Riedering',
					country: 'Germany',
					...order.checkout
				}
			})
		}
	},
	root: document.getElementById('root')
})

// endregion
