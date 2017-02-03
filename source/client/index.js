// region import

import {app, html} from 'hyperapp'

// internal

import actions from './actions'
import effects from './effects'

// views

import Cart from './views/cart'
import Customize from './views/customize'
import Main from './views/main'
import Menu from './views/menu'

// endregion

// region render

window.addEventListener('load', () =>
	app({
		model: Object.assign({
			cart: [],
			customize: {
				toppings: {},
				size: 'xl'
			},
			checkout: {
				city: '',
				country: '',
				name: '',
				phone: '',
				street: '',
				streetNumber: '',
				to: 'branch',
				zipCode: ''
			}
		}, JSON.parse(localStorage.getItem('state')) || {}, {
			isLoading: false
		}),
		hooks: {
			onUpdate: (last, model) => localStorage.setItem('state', JSON.stringify(model))
		},
		effects,
		update: actions,
		view: {
			'/': Main,
			'/menu': Menu,
			'/cart': Cart,
			'/menu/customize/:id': Customize
		}
	})
)

// endregion
