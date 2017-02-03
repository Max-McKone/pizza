// region import

import {html} from 'hyperapp'

// components

import Price from './price'

// internal

import menu from '../../../menu'
import pizzaPrice from '../utilities/pizza-price'

// endregion

// region ShoppingCartItem

export default ({pizza, size, toppings, remove}) => html`
	<div className="card">
		<img class="card-img-top img-fluid" src="http://lorempizza.com/380/240/${pizza}"/>
		<div className="card-block">
			<h3>${menu.pizzas[pizza].name}</h3>
			<p>${menu.pizzas[pizza].description}</p>
			<ul class="list-group">
				<li class="list-group-item flex-between">
					<div>
						${menu.sizes[size].name}
					</div>
					<div>
						${Price(menu.pizzas[pizza].price)} + ${Price(menu.sizes[size].price)}
					</div>
				</li>
				${Object
					.keys(toppings)
					.map(id => ({amount: toppings[id], id}))
					.map(({amount, id}) => html`
						<li class="list-group-item flex-between">
							<div>${amount}x ${menu.toppings[id].name}</div>
							<div>${Price(amount * menu.toppings[id].price)}</div>
						</li>
					`)}
			</ul>
		</div>
		<div className="card-footer flex-between">
			${Price(pizzaPrice({pizza, size, toppings}))}
			<button class="btn btn-danger btn-sm" onclick=${remove}>remove</button>
		</div>
	</div>`

// endregion
