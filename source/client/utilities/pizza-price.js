// region import

import menu from '../../../menu'

// internal

import getMostExpensivePizza from '././get-most-expensive-pizza'

// endregion

// region pizzaPrice

export default ({pizzas, size, toppings}) => Object
	.keys(toppings)
	.map(id => toppings[id] * menu.toppings[id].price)
	.reduce((a, b) => a + b, 0)
	+ getMostExpensivePizza(pizzas)
	+ menu.sizes[size].price

// endregion
