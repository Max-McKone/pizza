// region import

import ssio from 'socket.io-client'
import {app, html} from 'hyperapp'

// internal

import actions from '../actions'
import effects from '../effects'

// views

import Cart from '../views/cart'
import Customize from '../views/customize'
import Main from '../views/main'
import Menu from '../views/menu'
import Order from '../views/order'

// endregion

// region render

app({
	model: Object.assign({
		cart: [],
		customize: {
			toppings: {},
			size: 'xl',
			secondHalf: 'none'
		},
		checkout: {
			city: '',
			country: '',
			name: '',
			phone: '',
			street: '',
			to: 'branch',
			zipCode: ''
		},
		order: {
			cart: []
		}
	}, JSON.parse(localStorage.getItem('state')) || {}, {
		isLoading: false
	}),
	subs: [
		(_, actions) => {
			const io = ssio()
			actions.setSocketIO(io)
			io.on('connect', () => console.info('connected'))
			io.on('update', actions.liveData)
		},
		(_, actions) =>
			setInterval(() => actions.tick(), 1000)
	],
	hooks: {
		onUpdate: (last, model) => localStorage.setItem('state', JSON.stringify({...model, io: undefined}))
	},
	effects,
	update: actions,
	view: {
		'/': Main,
		'/menu': Menu,
		'/cart': Cart,
		'/menu/:pizza/customize': Customize,
		'/order': Order
	},
	root: document.getElementById('root')
})

// endregion
