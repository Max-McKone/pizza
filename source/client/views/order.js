// region import

import {html} from 'hyperapp'

// components

import Navigation from '../components/navigation'
import Order from '../components/order'

// endregion

// region Cart

export default ({cart, order}) => html`
	<div>
		${Navigation({
			active: '/order',
			CartItemCount: cart.length
		})}
		${Order(order)}
	</div>`

// endregion
