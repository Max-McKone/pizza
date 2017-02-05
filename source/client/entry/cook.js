// region import

import {app, html} from 'hyperapp'
import ssio from 'socket.io-client'

// views

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
	view: Orders
})

// endregion
