// region import

import {app, html} from 'hyperapp'

// views

import Orders from '../views/orders'

// endregion

// region render

window.addEventListener('load', () =>
	app({
		model: {
			orders: []
		},
		effects: {},
		update: {},
		view: Orders
	})
)

// endregion
