// region import

import {html} from 'hyperapp'

// components

import MenuItem from '../components/menu-item'
import Navigation from '../components/navigation'

// internal

import menu from '../../../menu'

// endregion

// region Menu

export default ({cart}, actions) => html`
	<div>
		${Navigation({
			active: '/menu',
			shoppingCartItemCount: cart.length
		})}
		<div class="container">
			<div class="card-deck">
				${Object
					.keys(menu.pizzas)
					.map(id => ({id, ...menu.pizzas[id]}))
					.map(pizza => MenuItem(pizza))
				}
			</div>
		</div>
	</div>`

// endregion
