// region import

import menu from '../../../menu'

// endregion

// region getMostExpensivePizza

export default pizzas => pizzas.reduce((a, b) => Math.max(a, menu.pizzas[b].price), 0)

// endregion
