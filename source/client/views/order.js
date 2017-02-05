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
			shoppingCartItemCount: cart.length,
			order
		})}
		${Order({
			...order,
			checkout: {
				street: 'Gubener Straße 71',
				zipCode: '83081',
				city: 'Riedering',
				country: 'Germany',
				...order.checkout,
				name: order.checkout.to === 'branch' ? 'Dank Pizza #42' : order.checkout.name,
				phone: order.checkout.to === 'branch' ? '+498032919067' : order.checkout.phone
			}
		})}
	</div>`

// endregion
