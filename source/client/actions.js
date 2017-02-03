// region actions

export default {
	addToCart: ({cart, ...rest}, item) => ({
		cart: [...cart, item],
		...rest,
		customize: {
			toppings: {},
			size: 'xl'
		}
	}),
	removeFromCart: ({cart, ...rest}, toRemove) => ({
		cart: cart.filter((_, index) => index !== toRemove),
		...rest
	}),
	customizeSize: ({customize, ...rest}, size) => ({
		customize: {
			...customize,
			size
		},
		...rest
	}),
	customizeAddTopping: ({customize, ...rest}, topping) => ({
		customize: {
			...customize,
			toppings: {
				...customize.toppings,
				[topping]: customize.toppings[topping] ? customize.toppings[topping] + 1 : 1
			}
		},
		...rest
	}),
	customizeRemoveTopping: ({customize, ...rest}, topping) => {
		const toppings = {...customize.toppings}

		if (toppings[topping] > 1)
			toppings[topping]--
		else
			delete toppings[topping]

		return {
			customize: {
				...customize,
				toppings
			},
			...rest
		}
	}
}

// endregion
