// region import

import {html} from 'hyperapp'

// components

import Price from './price'

// internal

import getMostExpensivePizza from '../utilities/get-most-expensive-pizza'
import menu from '../../../menu'
import pizzaPrice from '../utilities/pizza-price'

// endregion

// region CartItem

export default ({pizzas, size, toppings, remove}) => html`
	<div class="card">
		<div class="card-header">
			${pizzas
				.map(pizza => menu.pizzas[pizza].name)
				.join(' / ')
			}
		</div>
		<img class="card-img img-fluid" src="http://lorempizza.com/512/256/${pizzas}"/>
		<ul class="list-group list-group-flush">
			<li class="list-group-item flex-between">
				<div>
					${menu.sizes[size].name}
				</div>
				<div>
					${Price(getMostExpensivePizza(pizzas))} + ${Price(menu.sizes[size].price)}
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
		<div class="card-footer flex-between">
			${Price(pizzaPrice({pizzas, size, toppings}))}
			${remove ? html`
				<button class="btn btn-danger btn-sm" onclick=${remove}>remove</button>
			` : ''}
		</div>
	</div>`

// endregion
