// region import

import {html} from 'hyperapp'

// components

import Navigation from '../components/navigation'
import Price from '../components/price'
import ShoppingCartItem from '../components/shopping-cart-item'

// internal

import pizzaPrice from '../utilities/pizza-price'

// endregion

// region Cart

export default ({cart}, actions) => html`
	<div>
		${Navigation({
			active: '/cart',
			shoppingCartItemCount: cart.length
		})}
		<div class="jumbotron">
			<div class="container">
				<h1>Shopping Cart</h1>
				${Price(cart
					.map(pizza => pizzaPrice(pizza))
					.reduce((a, b) => a + b, 0)
				)}
			</div>
		</div>
		<div class="container">
			<div class="card-columns">
				${cart.map((item, index) =>
					ShoppingCartItem({
						...item,
						remove: () => actions.removeFromCart(index)
					})
				)}
			</div>
		</div>
	</div>`

// endregion
