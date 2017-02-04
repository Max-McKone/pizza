// region import

import {html} from 'hyperapp'

// components

import Navigation from './navigation'
import Price from './price'
import CartItem from './cart-item'

// internal

import pizzaPrice from '../utilities/pizza-price'

// endregion

// region Cart

export default ({cart, checkout: {country, phone, street, zipCode, city, to, name}, status}) => html`
	<div>
		<div class="jumbotron jumbotron-fix">
			<div class="container">
				<h1>Order <span class="badge badge-default">${status}</span></h1>
				<address>
					<strong>${name}</strong><br />
					${street}<br />
					${zipCode} ${city}<br />
					${country}<br />
					${phone}
				</address>
			</div>
		</div>
		<div class="container">
			<div class="card-columns">
				${cart.map((item, index) =>
					CartItem({
						...item,
					})
				)}
			</div>
		</div>
		<div class="jumbotron">
			<div class="container flex-between">
				<h3>
					<strong>Total</strong>: ${Price(cart
						.map(pizza => pizzaPrice(pizza))
						.reduce((a, b) => a + b, 0)
					)}
				</h3>
			</div>
		</div>
	</div>`

// endregion
