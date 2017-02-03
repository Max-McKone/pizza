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
		<div class="jumbotron jumbotron-fix">
			<div class="container">
				<h1>Dank Pizza</h1>
				<p class="lead">
					It's dangerous to go alone. Take one of these delicious, competitively-priced pizzas!
				</p>
			</div>
		</div>
		<div class="container">
			<div class="card-columns">
				${Object
					.keys(menu.pizzas)
					.map(id => ({id, ...menu.pizzas[id]}))
					.map(pizza => MenuItem(pizza))
				}
			</div>
		</div>
	</div>`

// endregion
