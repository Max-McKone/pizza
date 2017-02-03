// region import

import menu from '../../../menu'

// endregion

// region pizzaPrice

export default ({pizza, size, toppings}) => Object
	.keys(toppings)
	.map(id => toppings[id] * menu.toppings[id].price)
	.reduce((a, b) => a + b, 0)
	+ menu.pizzas[pizza].price
	+ menu.sizes[size].price

// endregion
