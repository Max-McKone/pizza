// region import

import menu from '../../../menu'

// endregion

// region pizzaPrice

export default ({pizzas, size, toppings}) => Object
	.keys(toppings)
	.map(id => toppings[id] * menu.toppings[id].price)
	.reduce((a, b) => a + b, 0)
	+ pizzas.map(pizza => menu.pizzas[pizza].price).reduce((a, b) => a + b, 0)
	+ menu.sizes[size].price

// endregion
